import { darken } from "polished";
import React, { FormEvent, MouseEvent, useState } from "react";
import styled from "styled-components";
import { UserWeight } from "../reducer/travelGuide";
import { colors } from "../utils/color";

interface UserWeightModalProps {
  onSubmit: (userWeight: UserWeight) => void;
  onClose: (e: MouseEvent<HTMLDivElement>) => void;
  meta: { id: number; name: string }[];
}

function UserWeightModal(props: UserWeightModalProps) {
  const { meta, onClose, onSubmit: searchWithUserWeight } = props;

  const [userWeight, setUserWeight] = useState<UserWeight>({
    viewWeight: 0,
    priceWeight: 0,
    facilityWeight: 0,
    surroundWeight: 0,
  });
  const weightList = Object.keys(userWeight);

  const onClickPlus = <K extends keyof UserWeight>(method: K) => {
    if (userWeight[method] < 3)
      setUserWeight((prev) => ({ ...prev, [method]: prev[method] + 1 }));
  };

  const onClickMinus = <K extends keyof UserWeight>(method: K) => {
    if (userWeight[method] > 0)
      setUserWeight((prev) => ({ ...prev, [method]: prev[method] - 1 }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchWithUserWeight(userWeight);
  };

  return (
    <StyledPriorityBackground onClick={onClose}>
      <StyledModal onSubmit={onSubmit}>
        {weightList.map((key, i) => (
          <StyledCategory key={meta[i].id}>
            <div>{meta[i].name}</div>
            <StyledInputWrapper>
              <StyledButton type="button" onClick={() => onClickMinus(key)}>
                -
              </StyledButton>
              <div>{userWeight[key]}</div>
              <StyledButton type="button" onClick={() => onClickPlus(key)}>
                +
              </StyledButton>
            </StyledInputWrapper>
          </StyledCategory>
        ))}
        <StyledConfirm type="submit">설정 완료</StyledConfirm>
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

const StyledModal = styled.form`
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
