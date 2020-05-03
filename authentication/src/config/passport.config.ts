import * as yup from 'yup';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import prisma from './../db';
import cryptoHelper from '../helpers/crypto.helper';
import { secret } from './../config/jwt.config';

const schema = yup.object().shape({
  username: yup.string().ensure(),
  password: yup.string().ensure(),
});

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

passport.use(
  'login',
  new LocalStrategy(
    { usernameField: 'username', passwordField: 'password' },
    async (username, password, done) => {
      try {
        try {
          await schema.validate({ username, password }, { strict: true });
        } catch ({ errors }) {
          const message = `Invalid body: ${Object.values(errors).join('\n')}`;
          return done({ message, status: 401 }, null);
        }
        const user = await prisma.user.findOne({ where: { username } });
        if (!user) {
          return done({ status: 401, message: 'Incorrect username.' }, false);
        }
        const { password: userPassword, ...userToSend } = user;

        return (await cryptoHelper.compare(password, userPassword))
          ? done(null, userToSend)
          : done({ status: 401, message: 'Wrong password.' }, null);
      } catch (err) {
        return done(err, null);
      }
    },
  ),
);

passport.use(
  'register',
  new LocalStrategy(
    { usernameField: 'username', passReqToCallback: true },
    async ({ body }, username, password, done) => {
      try {
        await schema.validate(body, { strict: true });
      } catch ({ errors }) {
        const message = `Invalid body: ${Object.values(errors).join('\n')}`;
        return done({ message, status: 401 }, null);
      }
      try {
        const userByUsername = await prisma.user.findOne({ where: { username } });
        if (userByUsername) {
          return done({ status: 401, message: 'Username is already taken.' }, null);
        }
        return done(null, { username, password });
      } catch (err) {
        return done(err, null);
      }
    },
  ),
);

passport.use(
  new JwtStrategy(options, async ({ id }, done) => {
    try {
      const user = await prisma.user.findOne({ where: { id } });
      return user
        ? done(null, user)
        : done({ status: 401, message: 'Token is invalid.' }, null);
    } catch (err) {
      return done(err);
    }
  }),
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));