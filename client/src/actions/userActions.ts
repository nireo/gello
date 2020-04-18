import {
  LoginInterface,
  RegisterInterface,
  UserWithToken,
} from '../interfaces/User';
import { Dispatch } from 'redux';
import { login, register } from '../services/user';
import { CONSTANTS } from './index';
import setTokens from '../utils/setTokens';

export const loginAction = (credentials: LoginInterface) => {
  return async (dispatch: Dispatch) => {
    const data: UserWithToken = await login(credentials);
    window.localStorage.setItem('gello-user', JSON.stringify(data));
    setTokens(data.token);
    dispatch({
      type: CONSTANTS.LOGIN,
      data: data.user,
    });
  };
};

export const registerAction = (credentials: RegisterInterface) => {
  return async (dispatch: Dispatch) => {
    const data: UserWithToken = await register(credentials);
    window.localStorage.setItem('gello-user', JSON.stringify(data));
    setTokens(data.token);

    dispatch({
      type: CONSTANTS.LOGIN,
      data: data.user,
    });
  };
};

export const checkLocalStorage = () => {
  return async (dispatch: Dispatch) => {
    const userInfo: string | null = localStorage.getItem('gello-user');
    if (userInfo) {
      const userInfoJSON: UserWithToken = JSON.parse(userInfo);
      setTokens(userInfoJSON.token);
      dispatch({
        type: CONSTANTS.LOGIN,
        data: userInfoJSON.user,
      });
    }
  };
};
