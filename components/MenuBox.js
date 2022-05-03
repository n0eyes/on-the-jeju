import React from "react";
import styled from "styled-components";
import Link from "next/link";

function MenuBox() {
  const isLoggedIn = false;
  const COMMON_DUMMY = ["도움말"];

  return (
    <StyledMenuBox>
      <StyledItemsWrapper>
        {!isLoggedIn ? (
          <>
            <Link href="/register">
              <StyledItem>회원가입</StyledItem>
            </Link>
            <Link href="/login">
              <StyledItem>로그인</StyledItem>
            </Link>
          </>
        ) : (
          <>
            <StyledItem>로그아웃</StyledItem>
            <Link href="/wishlist">
              <StyledItem>위시리스트</StyledItem>
            </Link>
          </>
        )}
        <StyledLine />
        {COMMON_DUMMY.map((each, i) => (
          <StyledItem key={i}>{each}</StyledItem>
        ))}
      </StyledItemsWrapper>
    </StyledMenuBox>
  );
}

export default MenuBox;

const StyledMenuBox = styled.div`
  width: 14rem;
  border-radius: 1rem;
  position: absolute;
  top: 3rem;
  right: 0;
  background-color: white;
  box-shadow: rgb(0 0 0 / 10%) 0px 4px 16px 0px;
  z-index: 9999;
`;

const StyledItemsWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
`;

const StyledItem = styled.li`
  padding: 1rem 1rem;
  font-size: 0.9rem;
  color: gray;
  &:hover {
    color: black;
    font-weight: bold;
    background-color: whitesmoke;
  }
`;
const StyledLine = styled.div`
  width: 100%;
  height: 1px;
  margin: 0.3rem 0rem;
  background-color: lightgray;
`;
