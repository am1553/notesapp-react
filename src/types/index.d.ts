type Tag = { id: string; name: string };

declare interface Note {
  id: string;
  title: string;
  description: string;
  is_archived: boolean;
  updated_at: string;
  tags: Tag[];
}

declare interface TokenRes {
  access: string;
  refresh: string;
}

declare interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

declare interface UserResponse {
  token: Token;
  user: User;
  noteID?: string;
}
