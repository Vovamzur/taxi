import { SET_IS_LOADING, SET_USER, UserAction } from './action.types';
import { User } from 'types/user.types';

type State = {
  user: User | null;
  isAuthorized: boolean;
  isLoading: boolean;
}

const initialState: State = {
  user: null,
  isAuthorized: false,
  isLoading: true,
};


export default (state = initialState, action: UserAction) => {
  switch (action.type) {
    case SET_USER:
      const user = action.payload;
      return {
        ...state,
        user,
        isAuthorized: Boolean(user && user.id),
      };

    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
};
