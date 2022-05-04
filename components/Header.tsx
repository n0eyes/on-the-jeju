import Link from "next/link";
import React, { useState } from "react";
import styled, { css } from "styled-components";
import MenuBox from "./MenuBox";

function Header() {
  const [onlyClick, setOnlyClick] = useState(false);
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onlyClick && setIsMenuOpened((prev) => !prev);
      setOnlyClick(true);
    } else {
      e.currentTarget.blur();
    }
  };

  const onMenuFocus = () => {
    setIsMenuOpened(true);
    setOnlyClick(false);
  };
  const onMenuBlur = () => {
    setIsMenuOpened(false);
  };
  return (
    <StyledHeader>
      <StyledTitleWrapper>
        <Link href="/">로고</Link>
        <Link href="/">서비스 명</Link>
      </StyledTitleWrapper>
      <StyledMenuWrapper>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        <StyledMenu
          onFocus={onMenuFocus}
          onBlur={onMenuBlur}
          onClick={onClick}
          tabIndex={-1}
          opened={isMenuOpened}
        >
          <StyledMenuLine />
          <StyledMenuLine />
          <StyledMenuLine />
          {isMenuOpened && <MenuBox />}
        </StyledMenu>
      </StyledMenuWrapper>
    </StyledHeader>
  );
}

export default Header;

const StyledHeader = styled.div`
  width: 100%;
  height: 4rem;
  position: fixed;
  top: 0;
  left: 0;
  padding: 0 6rem;
  display: flex;
  align-items: center;
  background-color: white;
  box-shadow: rgb(0 0 0 / 8%) 0px 1px 12px;
  justify-content: space-between;
  z-index: 100;
`;

const StyledTitleWrapper = styled.div`
  display: flex;

  & > a:nth-child(2) {
    padding-left: 1rem;
  }
`;

const StyledMenuWrapper = styled.div`
  display: flex;
  align-items: center;
  & > svg {
    width: 1.5rem;
    height: 1.5rem;
    margin: 0 2rem;
  }
`;
const StyledMenu = styled.div<{ tabIndex: number; opened: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 1rem;
  position: relative;
  cursor: pointer;
  ${({ opened }) =>
    opened &&
    css`
      & > div:first-child {
        transform: rotateZ(45deg) translateY(0.6rem);
      }
      & > div:nth-child(2) {
        display: none;
      }
      & > div:nth-child(3) {
        transform: rotateZ(-45deg) translateY(-0.6rem);
      }
    `};
`;

const StyledMenuLine = styled.div`
  width: 1.5rem;
  height: 2px;
  background-color: black;
  transition: transform 0.5s;
`;
