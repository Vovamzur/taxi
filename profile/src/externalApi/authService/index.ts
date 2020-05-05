import authApi from './../../helpers/auth-api.helper';
import { User } from './models/User';
import { Driver, CustomError } from 'models';

const error: CustomError = { status: 502, message: 'User service inaccessible' };

type VerifyToken = (token: string) => Promise<{ statusCode?: number, error?: CustomError }>

export const verifyToken: VerifyToken = async (token) => {
  try {
    const response = await authApi.post('/token/verify', { token });
    const statusCode = response.data as number

    return { statusCode };
  } catch {
    return { error }
  }
}

type GetUSerById = (id: number) => Promise<{ user?: User, error?: CustomError }>;

export const getUserById: GetUSerById = async (id) => {
  try {
    const user = await authApi.get(`/user/${id}`) as User;

    return { user };
  } catch {
    return { error };
  }
}

type UpdateUserByID = (userID: Driver['userID'], user: User) =>
  Promise<{ updatedUser?: User, error?: CustomError }>;

export const updateUserById: UpdateUserByID = async (userId, user) => {
  try {
    const updatedUser = await authApi.put(`/user/${userId}`, user) as User;

    return { updatedUser };
  } catch {
    return { error };
  }
}
