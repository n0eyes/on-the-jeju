import { darken } from "polished";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { colors } from "../utils/color";

interface RegisterForm {
  id: string;
  name: string;
  pw: string;
  pwCheck: string;
}

function register() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegisterForm>();

  const onValid: SubmitHandler<RegisterForm> = async (formData) => {};

  return (
    <StyledRegister>
      <StyledRegisterForm onSubmit={handleSubmit(onValid)}>
        <StyledTitle>회원가입</StyledTitle>
        <InputWrapper>
          <input
            {...register("id", {
              required: "ID is required",
              pattern: {
                value: /^[a-z]+[a-z0-9]{5,19}$/g,
                message:
                  "Must consist of 6 to 20 alphabetic characters or a number.",
              },
            })}
            placeholder="id"
          />
          {errors?.id && <StyledError>{errors?.id?.message}</StyledError>}
        </InputWrapper>
        <InputWrapper>
          <input
            placeholder="name"
            {...register("name", {
              required: "Name is required",
            })}
          />
          {errors?.name && <StyledError>{errors?.name?.message}</StyledError>}
        </InputWrapper>
        <InputWrapper>
          <input
            placeholder="password"
            {...register("pw", {
              required: "Password is required",
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/,
                message:
                  "Must be a combination of 8 to 16 characters in English and numbers.",
              },
            })}
          />
          {errors?.pw && <StyledError>{errors?.pw?.message}</StyledError>}
        </InputWrapper>
        <InputWrapper>
          <input
            placeholder="password check"
            {...register("pwCheck", {
              required: "Password-Check is required",
              validate: {
                checked: (v) =>
                  v === getValues("pw") || "Passwords do not match",
              },
            })}
          />
          {errors?.pwCheck && (
            <StyledError>{errors?.pwCheck.message}</StyledError>
          )}
        </InputWrapper>
        <StyledRegisterButton>가입하기</StyledRegisterButton>
      </StyledRegisterForm>
    </StyledRegister>
  );
}

export default register;

const StyledRegister = styled.div`
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
    flex-grow: 0;
  }
  & > input::placeholder {
    color: black;
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
const StyledRegisterForm = styled.form`
  padding: 2rem 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
`;

const StyledRegisterButton = styled.button`
  min-width: 20rem;
  height: 3rem;
  background-color: white;
  border: none;
  border-radius: 0.5rem;
  background-color: ${colors.salmon};
  margin-top: 3rem;

  &:hover {
    background-color: ${darken(0.1, colors.salmon)};
    border: none;
  }
`;
