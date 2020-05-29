export interface CreateItem {
  content: string;
}

export interface Tag {
  color: string;
  label: string;
}

export interface UpdateItem {
  uuid: string;
  content: string;
}

export interface Item {
  content: string;
  uuid: string;
}
