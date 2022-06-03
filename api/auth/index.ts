export interface LoginInput {
  id: string;
  pw: string;
}

export interface LoginOutput {
  status: number;
  success: boolean;
  message: string;

  userDto: {
    id: string;
    email: string;
    username: string;
    role: string;
    createDate: number[];
    lastModifiedData: number[];
  };
  accesstoken: string;
}

export interface RegisterInput {
  username: string;
  email: string;
  password: string;
}

export interface RegisterOutput {
  status: number;
  success: boolean;
  message: string;
  userDto: {
    id: number;
    username: string;
    email: string;
    role: string;
    createdDate: string[];
    lastModifiedDate: string[];
  };
}
