import Link from "next/link";
import { darken } from "polished";
import { colors } from "../utils/color";
import styled from "styled-components";

export default function Home() {
  return (
    // <StyledHome>
    //   <img src="/assets/landing1.jpeg" alt="landing-img" />
    //   <img src="/assets/landing2.jpeg" alt="landing-img" />
    //   <img src="/assets/landing3.jpeg" alt="landing-img" />
    // </StyledHome>
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
            <img src="/assets/landing1.jpeg"></img>
            <img src="/assets/landing2.jpeg"></img>
            <img src="/assets/landing3.jpeg"></img>
            <img src="/assets/landing4.jpeg"></img>
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
  width: 110rem;
  height: 50rem;
  background-color: ${colors.salmon};
  display: flex;
  border-radius: 2rem;
`;
const StyledMainIntro = styled.div`
  font-weight: bold;
  color: white;
  font-size: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledGridPicture = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  & > img {
    width: 50%;
    height: 50%;
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
  margin-top: 3rem;
  width: 25rem;
  height: 7rem;
  background-color: ${colors.beige};
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${colors.black};
  transition: 0.3s;
  &:hover {
    background-color: ${darken(0.1, colors.beige)};
  }
`;
