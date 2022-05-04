import { LoginOutput } from "./index";
import { LoginInput } from ".";

export const mock = {
  login() {
    const data: LoginOutput = {
      id: "test",
      name: "seyeon",
      accessToken: "mockToken",
    };
    return {
      data,
      mutate(formData: LoginInput) {
        console.log("login request!");
      },
    };
  },
  register() {},
};
