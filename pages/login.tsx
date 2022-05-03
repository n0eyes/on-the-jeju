import { darken } from "polished";
import React from "react";
import styled from "styled-components";
import { colors } from "../utils/color";
function login() {
  return (
    <StyledLogin>
      <StyledLoginForm>
        <StyledTitle>로그인</StyledTitle>
        <InputWrapper>
          <input placeholder="id" />
        </InputWrapper>
        <InputWrapper>
          <input placeholder="password" />
        </InputWrapper>
        <StyledButtonWrapper>
          <StyledLoginButton>로그인</StyledLoginButton>
          <StyledRegisterButton>회원가입</StyledRegisterButton>
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
  justify-content: center;
  width: 100%;
  padding: 1rem 3rem;
  font-size: 1.2rem;

  & > input {
    min-width: 20rem;
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
  background-color: ${colors.white};
  border: 1px solid ${colors.salmon};
  border-radius: 0.5rem;

  &:hover {
    border-color: ${darken(0.01, colors.salmon)};
    background-color: ${darken(0.01, colors.white)};
  }
`;
