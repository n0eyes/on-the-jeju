import { AxiosInstance } from "axios";
import {
  LoginInput,
  LoginOutput,
  RegisterInput,
  RegisterOutput,
} from "./../../api/auth/index";
import { useMutation } from "react-query";

export const useFetchLogin = (request: AxiosInstance) =>
  useMutation((formData: LoginInput): Promise<LoginOutput> => {
    return request.post("/login", formData);
  }, {});

export const useFetchRegister = (request: AxiosInstance) =>
  useMutation((formData: RegisterInput): Promise<RegisterOutput> => {
    return request.post("/join", formData);
  });
