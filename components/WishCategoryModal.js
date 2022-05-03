import React from "react";
import styled from "styled-components";

function WishCategoryModal({ onClose }) {
  return (
    <StyledBackground onClick={onClose}>
      <StyledModal>
        <StyledModalHeader>위시리스트</StyledModalHeader>
        <StyledModalBody>
          <StyledListWrapper>
            <StyledAddButton>+</StyledAddButton>
            <StyledAddDesc>새로운 위시리스트 만들기</StyledAddDesc>
          </StyledListWrapper>
          <StyledListWrapper>
            <StyledThumbnail src="/assets/incheon.webp" />
            <StyledCategoryTitle>카페 맛집</StyledCategoryTitle>
          </StyledListWrapper>
        </StyledModalBody>
      </StyledModal>
    </StyledBackground>
  );
}

export default WishCategoryModal;

const StyledBackground = styled.div`
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
  background-color: white;
  border-radius: 1rem;
  box-shadow: rgb(0 0 0 / 25%) 0px 4px 16px 0px;

  @keyframes open {
    from {
      opacity: 0;
      transform: translateY(200px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  animation: open 0.5s;
`;

const StyledModalHeader = styled.div`
  width: 100%;
  height: 5rem;
  font-size: 1.5rem;
  border-bottom: 1px solid lightgrey;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledModalBody = styled.div`
  width: 100%;
  padding: 1rem 0;

  & > div + div {
    margin-top: 1rem;
  }
`;
const StyledListWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1rem;
`;
const StyledAddButton = styled.div`
  width: 5rem;
  height: 5rem;
  border: 1px solid lightgrey;
  border-radius: 1rem;
  font-size: 2rem;
  margin-right: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledAddDesc = styled.div`
  font-size: 1.2rem;
`;
const StyledThumbnail = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 1rem;
  margin-right: 1rem;
`;
const StyledCategoryTitle = styled.div`
  font-size: 1.2rem;
`;
