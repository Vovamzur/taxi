import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import knexConnection from './../db/knexConnection';
import cryptoHelper from '../helpers/crypto.helper';
import loginSchema from './../validations/login.schema';
import { secret } from './../config/jwt.config';
import { User } from '../types/user.type';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

passport.use(
  'login',
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      try {
        const user = await knexConnection<User>('users').where('email', '=', email).first();
        if (!user) {
          return done({ status: 401, message: 'Incorrect email.' }, false);
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
    { usernameField: 'email', passReqToCallback: true },
    async ({ body }, email, password, done) => {
      try {
        const userByEmail = await knexConnection<User>('users').where('email', '=', email).first();
        if (userByEmail) {
          return done({ status: 401, message: 'Email is already taken.' }, null);
        }
        return done(null, body);
      } catch (err) {
        return done(err, null);
      }
    },
  ),
);

passport.use(
  new JwtStrategy(options, async ({ id }, done) => {
    try {
      const user = await knexConnection<User>('users').where('id', '=', id).first();
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
