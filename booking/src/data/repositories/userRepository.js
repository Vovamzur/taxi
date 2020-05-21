import { UserModel } from '../models';
import BaseRepository from './baseRepository';

class UserRepository extends BaseRepository {

}

export default new UserRepository(UserModel);
