import { LoginOutput } from "./index";
import { UseMutationResult } from "react-query";
import { useFetchLogin } from "./../../query/auth/authQuery";

export const real = {
  login(): UseMutationResult<LoginOutput> {
    return useFetchLogin();
  },
  register() {},
};
