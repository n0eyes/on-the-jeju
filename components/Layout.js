import React from "react";
import styled from "styled-components";
import Footer from "./Footer";
import Header from "../components/Header";

function Layout({ children }) {
  return (
    <>
      <StyledLayout>
        <Header />
        <StyledChildrenWrapper>{children}</StyledChildrenWrapper>
        <Footer />
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
  padding: 0em 6em;
`;

const StyledChildrenWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  padding-top: 4rem;
  padding-bottom: 7rem;
  width: 100%;
`;
