import React from "react";
import styled from "styled-components";
function PriorityModal({ onClose }) {
  const CATEGORY_DUMMY = ["뷰", "카페 및 식당", "가격", "편의시설"];

  return (
    <StyledPriorityBackground onClick={onClose}>
      <StyledModal>
        {CATEGORY_DUMMY.map((category, i) => (
          <StyledCategory key={i}>
            <div>{category}</div>
            <StyledInputWrapper>
              <StyledButton>-</StyledButton>
              <span>0</span>
              <StyledButton>+</StyledButton>
            </StyledInputWrapper>
          </StyledCategory>
        ))}
        <StyledConfirm>설정 완료</StyledConfirm>
      </StyledModal>
    </StyledPriorityBackground>
  );
}

export default PriorityModal;

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
  width: 35rem;
  height: 30rem;
  background-color: white;
  box-shadow: rgb(0 0 0 / 25%) 0px 4px 16px 0px;
  border-radius: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50%, auto));
  padding: 2rem;
`;
const StyledCategory = styled.div`
  & > div {
    font-size: 1.3rem;
    text-align: center;
  }
`;
const StyledInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 3rem;
`;
const StyledButton = styled.button`
  width: 3rem;
  height: 3rem;
  font-size: 1.2rem;
  border-radius: 50%;
  background-color: powderblue;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
`;
const StyledConfirm = styled.button`
  grid-column-start: 1;
  grid-column-end: 3;
  background-color: white;
  color: powderblue;
  border: 1px solid powderblue;
  font-size: 1.21em;
  width: 20rem;
  justify-self: center;
`;
