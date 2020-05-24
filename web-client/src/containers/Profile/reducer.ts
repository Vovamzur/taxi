import { SET_IS_LOADING, SET_USER, UserAction, SET_DRIVER, SET_CAR } from './action.types';
import { User } from 'types/user.types';
import { Driver } from 'types/profile.types';

type State = {
  user: User | null;
  isAuthorized: boolean;
  isLoading: boolean;
  driver: Driver | null;
}

const initialState: State = {
  user: null,
  isAuthorized: false,
  isLoading: true,
  driver: null,
};

export default (state = initialState, action: UserAction): State => {
  switch (action.type) {
    case SET_USER:
      const user = action.payload;
      return {
        ...state,
        user,
        isAuthorized: Boolean(user && user.id),
        driver: user === null ? null: state.driver,
      };

    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case SET_DRIVER:
      return {
        ...state,
        driver: action.payload
      }

    case SET_CAR:
      return {
        ...state,
        driver: {
          ...state.driver!,
          car: action.payload
        }
      }

    default:
      return state;
  }
};
