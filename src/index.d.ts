type Token = {
  access: string;
  refresh: string;
};
declare interface SignIn {
  token: Token;
  user: User;
  noteID: string;
}

type Tag = { id?: string; name: string };

declare interface Note {
  id?: string;
  title: string;
  description: string;
  isArchived: boolean;
  updatedAt?: string;
  tags: Tag[];
}

declare interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password?: string;
}