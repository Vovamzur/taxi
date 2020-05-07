import { User } from 'externalApi/authService/models/User';
import { Driver } from './Driver';
import { Car } from './Car'

export type FullDriver = User & Driver & { car?: Car };
