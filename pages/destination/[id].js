import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Chart from "chart.js";
import WishCategoryModal from "../../components/WishCategoryModal";
function destination() {
  const [isWishOpened, setIsWishOpened] = useState(false);
  const chartRef = useRef();

  const onWishHandler = () => setIsWishOpened((prev) => !prev);
  const onWishClose = (e) =>
    e.target === e.currentTarget && setIsWishOpened(false);

  const data = {
    labels: ["뷰", "카페 및 식당", "가격", "편의시설"],
    datasets: [
      {
        label: "Category",
        data: [65, 59, 90, 81],
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      },
    ],
  };

  useEffect(() => {
    const myChart = new Chart(chartRef.current, {
      type: "radar",
      data,
      options: {
        responsive: false,
        elements: {
          line: {
            borderWidth: 3,
          },
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, []);

  return (
    <StyledDestination>
      <StyledTitle>관광지 이름</StyledTitle>
      <StyledNav>
        <StyledCommentWrapper>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
          <span>4.96</span>
          <Link href="/comments">후기 155개</Link>
          <Link href="/maps">위치</Link>
        </StyledCommentWrapper>
        <StyledButtonWrapper>
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
          <span onClick={onWishHandler}>찜 하기</span>
          {isWishOpened && <WishCategoryModal onClose={onWishClose} />}
        </StyledButtonWrapper>
      </StyledNav>
      <StyledImageWrapper>
        <StyledThumbnail src="/assets/seoul.webp" />
        <StyledThumbnail src="/assets/daegu.webp" />
        <StyledThumbnail src="/assets/incheon.webp" />
        <StyledThumbnail src="/assets/incheon.webp" />
        <StyledThumbnail src="/assets/incheon.webp" />
        <StyledMoreButton>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
          사진 더 보기
        </StyledMoreButton>
      </StyledImageWrapper>
      <StyledMain>
        <StyledInfo>
          <StyledInfoTitle>상세 정보</StyledInfoTitle>
          <StyledDesc>
            관광지 정보 예시) 부서진 산호로 이루어진 백사장 등 빼어난 경관을
            자랑하는 우도 8경이 유명하며, 인골분 이야기를 비롯한 몇 가지 설화와
            잠수소리·해녀가 등의 민요가 전해진다. 남서쪽의 동천진동 포구에는
            일제강점기인 1932년 일본인 상인들의 착취에 대항한 우도 해녀들의
            항일항쟁을 기념하여 세운 해녀노래비가 있으며, 남동쪽 끝의
            쇠머리오름에는 우도 등대가 있다. 성산포에서 1시간 간격으로
            정기여객선이 운항된다.
          </StyledDesc>
        </StyledInfo>
        <canvas id="canvas" ref={chartRef}></canvas>
      </StyledMain>
    </StyledDestination>
  );
}

export default destination;

const StyledDestination = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledTitle = styled.div`
  font-weight: bold;
  font-size: 2rem;
  padding: 1.5rem 0;
`;

const StyledNav = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
`;
const StyledCommentWrapper = styled.div`
  display: flex;
  align-items: center;
  & > svg {
    width: 1.5rem;
  }
  & > span {
    margin: 0 0.5rem;
  }
  & > a {
    border-bottom: 1px solid black;
    margin: 0 0.5rem;
  }
  & > a:last-child {
    border: none;
  }
`;
const StyledButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  & > svg {
    width: 1.5rem;
    margin-right: 1rem;
  }
  & > span {
    border-bottom: 1px solid black;
  }
`;

const StyledImageWrapper = styled.div`
  width: 100%;
  position: relative;
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  & > img:first-child {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 3;
  }
`;

const StyledMoreButton = styled.button`
  position: absolute;
  background-color: white;
  border-radius: 0.5rem;
  padding: 1rem 1.5rem;
  bottom: 2rem;
  right: 1rem;
  border: 1px solid black;
  display: flex;

  & > svg {
    width: 1rem;
    margin-right: 0.5rem;
  }
`;

const StyledThumbnail = styled.img`
  width: 100%;
  border-radius: 1rem;
`;

const StyledMain = styled.div`
  width: 100%;
  display: flex;
  padding-top: 2rem;
  & > canvas {
    width: 50%;
  }
`;
const StyledInfo = styled.div`
  width: 50%;

  display: flex;
  flex-direction: column;
`;
const StyledInfoTitle = styled.div`
  font-size: 1.5rem;
  padding: 1rem 0;
  border-bottom: 1px solid lightgrey;
`;
const StyledDesc = styled.div`
  font-size: 1.1rem;
  padding: 1rem 1rem;
`;
