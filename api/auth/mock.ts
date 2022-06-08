import { LoginOutput } from "./index";
import { LoginInput } from ".";

export const mock = {
  login() {
    const data: LoginOutput = {
      status: 200,
      success: true,
      message: "success",

      userDto: {
        id: "test",
        email: "test@test.com",
        username: "seyeon",
        role: "user",
        createDate: [1, 2, 3],
        lastModifiedData: [1, 2, 3],
      },
      accesstoken: "mockToken",
    };
    return {
      data,
      mutate(formData: LoginInput) {},
    };
  },
  register() {},
};
