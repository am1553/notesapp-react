type Token = {
  access: string;
  refresh: string;
};
declare interface SignIn {
  token: Token;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  noteID: string;
}
