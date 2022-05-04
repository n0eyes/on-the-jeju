export interface LoginInput {
  id: string;
  pw: string;
}

export interface LoginOutput {
  id: string;
  name: string;
  accessToken: string;
}

export interface RegisterForm {
  id: string;
  pw: string;
  pwConfirm: string;
}
