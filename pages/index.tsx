import Link from "next/link";
import { darken } from "polished";
import { colors } from "../utils/color";
import styled from "styled-components";

export default function Home() {
  return (
    <StyledHome>
      <img src="/assets/landing1.jpeg" alt="landing-img" />
      <img src="/assets/landing2.jpeg" alt="landing-img" />
      <img src="/assets/landing3.jpeg" alt="landing-img" />
    </StyledHome>
  );
}

const StyledHome = styled.div`
  width: 100%;
  height: calc(100vh - 4rem);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(33%, auto));
  margin-bottom: -4rem;
  & > img {
    width: 100%;
    height: 100%;
  }
`;
