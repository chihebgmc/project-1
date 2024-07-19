import axios from 'axios';
import {
  AUTH_ERROR,
  AUTH_LOADING,
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_PROFILE,
  AUTH_REGISTER,
} from './types';
import { header } from 'express-validator';

const API_URL = '/api/users/';

// Register user
export const register = userData => {
  return async dispatch => {
    try {
      dispatch({ type: AUTH_LOADING, payload: true });

      //   Wait 2 seconds
      await new Promise(resolve => setTimeout(resolve, 2000));

      //   Send POST request to /api/users endpoint
      const response = await axios.post(API_URL, userData);
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      dispatch({ type: AUTH_REGISTER, payload: response.data });
    } catch (error) {
      console.log(error);
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({ type: AUTH_ERROR, payload: message });
    }
  };
};

// Login user
export const login = userData => {
  return async dispatch => {
    try {
      dispatch({ type: AUTH_LOADING, payload: true });

      //   Wait 2 seconds
      await new Promise(resolve => setTimeout(resolve, 2000));

      //   Send POST request to /api/users/login endpoint
      const response = await axios.post(API_URL + 'login', userData);
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      dispatch({ type: AUTH_LOGIN, payload: response.data });
    } catch (error) {
      console.log(error);
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({ type: AUTH_ERROR, payload: message });
    }
  };
};

// Get use profile
export const getProfile = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const config = {
    headers: {
      'x-auth-token': user ? user.token : null,
    },
  };
  return async dispatch => {
    try {
      dispatch({ type: AUTH_LOADING, payload: true });

      //   Wait 2 seconds
      await new Promise(resolve => setTimeout(resolve, 2000));

      //   Send GET request to /api/users/me endpoint
      const response = await axios.get(API_URL + 'me', config);
      dispatch({ type: AUTH_PROFILE, payload: response.data });
    } catch (error) {
      console.log(error);
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({ type: AUTH_ERROR, payload: message });
    }
  };
};

// Logout user
export const logout = () => {
  localStorage.removeItem('user');
  return { type: AUTH_LOGOUT };
};
