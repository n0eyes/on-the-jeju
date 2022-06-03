import { darken } from "polished";
import React, { MouseEvent } from "react";
import styled from "styled-components";
import { UserWeight } from "../reducer/travelGuide";
import { colors } from "../utils/color";

interface UserWeightModalProps {
  onSubmit: () => void;
  onClose: (e: MouseEvent<HTMLDivElement>) => void;
  onClick: (method: "+" | "-", i: number) => void;
  meta: { id: number; name: string }[];
  weight: UserWeight;
}

function UserWeightModal(props: UserWeightModalProps) {
  const { meta, weight, onClose, onClick, onSubmit } = props;
  const weightList = Object.keys(weight);

  return (
    <StyledPriorityBackground onClick={onClose}>
      <StyledModal>
        {weightList.map((key, i) => (
          <StyledCategory key={meta[i].id}>
            <div>{meta[i].name}</div>
            <StyledInputWrapper>
              <StyledButton onClick={() => onClick("-", i)}>-</StyledButton>
              <div>{weight[key]}</div>
              <StyledButton onClick={() => onClick("+", i)}>+</StyledButton>
            </StyledInputWrapper>
          </StyledCategory>
        ))}
        <StyledConfirm onClick={onSubmit}>설정 완료</StyledConfirm>
      </StyledModal>
    </StyledPriorityBackground>
  );
}

export default UserWeightModal;

const StyledPriorityBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 999;
`;

const StyledModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 20rem;
  background-color: white;
  box-shadow: rgb(0 0 0 / 25%) 0px 4px 16px 0px;
  box-sizing: border-box;
  border-radius: 1rem;
  padding: 2rem 2rem;
`;
const StyledCategory = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 2rem;
  padding: 1.5rem 0;
  & > div {
    font-size: 1.3rem;
    text-align: center;
    flex-shrink: 0;
  }
`;
const StyledInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 6rem;
  gap: 1rem;
`;
const StyledButton = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  font-size: 1.3rem;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  transition: color 0.2s;
  &:hover {
    color: ${colors.salmon};
  }
`;
const StyledConfirm = styled.button`
  width: 10rem;
  background-color: ${colors.salmon};
  color: ${colors.white};
  border: 1px solid ${colors.salmon};
  border-radius: 0.5rem;
  font-size: 1em;
  margin-top: 1rem;
  padding: 0.5rem 0;
  transition: background-color 0.2s;
  &:hover {
    background-color: ${darken(0.1, colors.salmon)};
  }
`;
