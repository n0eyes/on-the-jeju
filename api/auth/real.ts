import { AxiosInstance } from "axios";
import { LoginOutput, RegisterOutput } from "./index";
import { UseMutationResult } from "react-query";
import { useFetchLogin, useFetchRegister } from "./../../query/auth/authQuery";

export interface AuthAPI {
  login: () => UseMutationResult<LoginOutput>;
  register: () => UseMutationResult<RegisterOutput>;
}

export const createAuthAPI = (request: AxiosInstance): AuthAPI => {
  return {
    login: (): UseMutationResult<LoginOutput> => useFetchLogin(request),
    register: (): UseMutationResult<RegisterOutput> =>
      useFetchRegister(request),
  };
};

export const real = {};
