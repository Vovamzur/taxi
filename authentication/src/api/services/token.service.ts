import tokenHelper from './../../helpers/token.helper';

export const veriFyToken = async (authHeader: string) => {
  const [_, token] = authHeader.split(' ');
  const isValid = await tokenHelper.verifyToken(token);

  return isValid;
};
