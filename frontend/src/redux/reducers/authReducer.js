import {
  AUTH_ERROR,
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_PROFILE,
} from '../actions/types';
import { AUTH_REGISTER } from '../actions/types';
import { AUTH_LOADING } from '../actions/types';

// Get user from local storage
const user = JSON.parse(localStorage.getItem('user'));

// Initial State
const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case AUTH_REGISTER:
    case AUTH_LOGIN:
    case AUTH_PROFILE:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        isSuccess: true,
        isError: false,
        message: '',
      };

    case AUTH_LOGOUT:
      return {
        ...state,
        user: null,
      };

    case AUTH_ERROR:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: true,
        message: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
