import React from "react";
import styled from "styled-components";
function Footer() {
  return <StyledFooter>도움말</StyledFooter>;
}

export default Footer;

const StyledFooter = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 3rem;
  background-color: #f7f7f7;
  padding: 3rem 6rem;
  text-align: end;
`;
