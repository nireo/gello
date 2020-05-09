export interface User {
  id: number;
  username: string;
  uuid: string;
  email: string;
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

export interface UpdateUser {
  email: string;
  username: string;
}
