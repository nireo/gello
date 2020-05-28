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
