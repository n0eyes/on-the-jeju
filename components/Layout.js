import React from "react";
import styled from "styled-components";
import Header from "../components/Header";

function Layout({ children }) {
  return (
    <>
      <StyledLayout>
        <Header />
        <StyledChildrenWrapper>{children}</StyledChildrenWrapper>
      </StyledLayout>
    </>
  );
}

export default Layout;

const StyledLayout = styled.div`
  position: relative;
  width: 100vw;
  min-height: 100vh;
  display: flex;
`;

const StyledChildrenWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 4rem 0;
  width: 100%;
`;
