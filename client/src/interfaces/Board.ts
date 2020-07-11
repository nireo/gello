export interface CreateBoard {
  title: string;
  color: string;
}

export interface Board {
  created: string;
  title: string;
  uuid: string;
  color: string;
}

export interface Activity {
  uuid: string;
  username: string;
  content: string;
}
