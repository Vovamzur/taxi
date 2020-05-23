import callWebApi from '../helpers/webApiHelper';
import { LoginCredentials, RegisterCredentials } from '../types/auth.types';
import { User } from '../types/user.types';

const authUrl =process.env.AUTH_SERVICE_URL;

export const login = async (request: LoginCredentials) => {
  const response = await callWebApi({
    endpoint: `${authUrl}/api/auth/login`,
    type: 'POST',
    request,
  });
  return response.json();
};

export const registration = async (request: RegisterCredentials) => {
  const response = await callWebApi({
    endpoint: `${authUrl}/api/auth/registration`,
    type: 'POST',
    request,
  });
  return response.json();
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const response = await callWebApi({
      endpoint: `${authUrl}/api/auth/user`,
      type: 'GET',
    });
    return response.json();
  } catch (e) {
    return null;
  }
};
