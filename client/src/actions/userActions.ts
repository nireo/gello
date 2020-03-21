import {
  LoginInterface,
  RegisterInterface,
  UserWithToken
} from '../interfaces/User';
import { Dispatch } from 'redux';
import { login, register } from '../services/user';
import { CONSTANTS } from './index';
import setTokens from '../utils/setTokens';

export const loginAction = async (credentials: LoginInterface) => {
  return async (dispatch: Dispatch) => {
    const data: UserWithToken = await login(credentials);
    setTokens(data.token);

    dispatch({
      type: CONSTANTS.LOGIN,
      data: data
    });
  };
};

export const registerAction = async (credentials: RegisterInterface) => {
  return async (dispatch: Dispatch) => {
    const data: UserWithToken = await register(credentials);
    setTokens(data.token);

    dispatch({
      type: CONSTANTS.LOGIN,
      data: data
    });
  };
};
