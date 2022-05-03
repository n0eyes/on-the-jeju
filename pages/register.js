import React from "react";
import styled from "styled-components";
function login() {
  return (
    <StyledLogin>
      <StyledLoginForm>
        <StyledTitle>회원가입</StyledTitle>
        <InputWrapper>
          <input placeholder="id" />
        </InputWrapper>
        <InputWrapper>
          <input placeholder="password" />
        </InputWrapper>
        <InputWrapper>
          <input placeholder="password-confirm" />
        </InputWrapper>
        <StyledButtonWrapper>
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
    border: 1px solid black;
    background-color: rgba(176, 224, 230, 0.5);
    outline: none;
    padding: 0 1rem;
  }
  & > input::placeholder {
    color: black;
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
  background-color: powderblue;
  border: none;
  border-radius: 0.5rem;
  margin: 1rem 0;
`;

const StyledRegisterButton = styled.button`
  min-width: 20rem;
  height: 3rem;
  background-color: white;
  border: 1px solid powderblue;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.5s;
  &:hover {
    background-color: powderblue;
    border: none;
  }
`;
