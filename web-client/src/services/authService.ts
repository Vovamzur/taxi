import callWebApi from '../helpers/webApiHelper';
import { LoginCredentials, RegisterCredentials, LoginResponse } from '../types/auth.types';
import { User } from '../types/user.types';
import { Driver } from '../types/profile.types';

export const login = async (request: LoginCredentials): Promise<LoginResponse> => {
  const response = await callWebApi({
    endpoint: `/api/auth/login`,
    type: 'POST',
    request,
  });
  return response.json();
};

export const registration = async (request: RegisterCredentials): Promise<LoginResponse> => {
  const response = await callWebApi({
    endpoint: `/api/auth/registration`,
    type: 'POST',
    request,
  });
  return response.json();
};

export const getCurrentUser = async (): Promise<User & { driver?: Driver } | null> => {
  try {
    const response = await callWebApi({
      endpoint: `/api/auth/user`,
      type: 'GET',
    });
    return response.json();
  } catch (e) {
    return null;
  }
};
