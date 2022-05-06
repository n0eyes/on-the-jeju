import React from "react";
import { darken } from "polished";
import styled from "styled-components";
import { colors } from "../utils/color";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";
import auth from "../api/auth/api";
import { useDispatch } from "react-redux";
import * as authAction from "../store/modules/auth";
interface LoginForm {
  id: string;
  pw: string;
}

function login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const dispatch = useDispatch();
  const router = useRouter();
  const loginMutation = auth.login();

  const onValid: SubmitHandler<LoginForm> = async (formData) => {
    loginMutation.mutate(formData);
    dispatch(authAction.login(loginMutation.data));
    //실제는 라이프사이클로 처리
    router.replace("/");
  };

  return (
    <StyledLogin>
      <StyledLoginForm onSubmit={handleSubmit(onValid)}>
        <StyledTitle>로그인</StyledTitle>
        <InputWrapper>
          <input
            placeholder="id"
            {...register("id", {
              required: "id is required",
            })}
          />
          {errors?.id && <StyledError>{errors?.id?.message}</StyledError>}
        </InputWrapper>
        <InputWrapper>
          <input
            placeholder="password"
            type="password"
            {...register("pw", {
              required: "pw is required",
            })}
          />
          {errors?.pw && <StyledError>{errors?.pw?.message}</StyledError>}
        </InputWrapper>
        <StyledButtonWrapper>
          <StyledLoginButton type="submit">로그인</StyledLoginButton>
          <Link href="/register">
            <StyledRegisterButton>회원가입</StyledRegisterButton>
          </Link>
        </StyledButtonWrapper>
      </StyledLoginForm>
    </StyledLogin>
  );
}

export default login;

const StyledLogin = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  padding-bottom: 2rem;
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 1rem 3rem;
  font-size: 1.2rem;

  & > input {
    width: 20rem;
    height: 3rem;
    border: 1px solid ${colors.lightgray};
    background-color: ${colors.white};
    outline: none;
    padding: 0 1rem;
  }
  & > input::placeholder {
    color: ${colors.black};
  }
`;
const StyledError = styled.div`
  width: 20rem;
  font-size: 0.8rem;
  padding: 0 1rem;
  height: 1rem;
  color: ${colors.red};
  margin-top: 0.5rem;
  margin-bottom: -0.5rem;
`;
const StyledLoginForm = styled.form`
  padding: 2rem 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
`;
const StyledButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
`;
const StyledLoginButton = styled.button`
  min-width: 20rem;
  height: 3rem;
  background-color: ${colors.salmon};
  border: none;
  border-radius: 0.5rem;
  margin: 1rem 0;

  &:hover {
    background-color: ${darken(0.1, colors.salmon)};
  }
`;

const StyledRegisterButton = styled.button`
  min-width: 20rem;
  height: 3rem;
  background-color: ${colors.beige};
  border: none;
  border-radius: 0.5rem;

  &:hover {
    background-color: ${darken(0.1, colors.beige)};
  }
`;
