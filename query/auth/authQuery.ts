import axios from "axios";
import { useRouter } from "next/router";
import { LoginInput, LoginOutput } from "./../../api/auth/index";
import { useMutation } from "react-query";

export const useFetchLogin = () =>
  useMutation(
    (formData: LoginInput): Promise<LoginOutput> => {
      return axios.post("/login", formData);
    },
    {
      onSuccess() {
        useRouter().replace("/");
      },
    }
  );
