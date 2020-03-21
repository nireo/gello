import { setToken as setUserToken } from '../services/user';
import { setToken as setListToken } from '../services/list';
import { setToken as setBoardToken } from '../services/board';
import { setToken as setItemToken } from '../services/item';

const setTokens = (token: string) => {
  setUserToken(token);
  setBoardToken(token);
  setListToken(token);
  setItemToken(token);
};

export default setTokens;
