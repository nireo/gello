export interface User {
  id: number;
  username: string;
  uuid: string;
}

export interface LoginInterface {
  username: string;
  password: string;
}

export interface RegisterInterface {
  username: string;
  email: string;
  password: string;
}

export interface UserWithToken {
  token: string;
  user: User;
}
