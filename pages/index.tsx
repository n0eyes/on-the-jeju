import Link from "next/link";
import { darken } from "polished";
import { colors } from "../utils/color";
import styled from "styled-components";
import { useEffect } from "react";
import axios from "../utils/axios/axios";

export default function Home() {
  return (
    <StyledHome>
      <StyledContainer>
        <StyledMainBanner>
          <StyledIntroWrapper>
            <StyledMainIntro>
              취향에 맞는 여행지를 선별해보세요!
            </StyledMainIntro>
            <Link href="/travel-guide" passHref>
              <StyledServiceLink>서비스 이용 바로가기</StyledServiceLink>
            </Link>
          </StyledIntroWrapper>
          <StyledGridPicture>
            <img src="./assets/seoul.webp"></img>
            <img src="./assets/incheon.webp"></img>
            <img src="./assets/daegu.webp"></img>
            <img src="./assets/daejeon.webp"></img>
          </StyledGridPicture>
        </StyledMainBanner>
      </StyledContainer>
    </StyledHome>
  );
}

const StyledHome = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledMainBanner = styled.div`
  width: 80rem;
  height: 30rem;
  background-color: ${colors.salmon};
  display: flex;
  border-radius: 2rem;
`;
const StyledMainIntro = styled.div`
  font-weight: bold;
  color: white;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledGridPicture = styled.div`
  width: 50%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  & > img {
    width: 100%;
    height: 100%;
  }

  & > img:nth-child(2) {
    border-top-right-radius: 2rem;
  }
  & > img:nth-child(4) {
    border-bottom-right-radius: 2rem;
  }
`;
const StyledIntroWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const StyledServiceLink = styled.a`
  margin-top: 2rem;
  width: 15rem;
  height: 5rem;
  background-color: ${colors.beige};
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: ${colors.black};
  transition: 0.3s;

  &:hover {
    background-color: ${darken(0.1, colors.beige)};
  }
`;
