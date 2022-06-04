import Link from "next/link";
import React, { useState, useRef, useEffect, MouseEvent } from "react";
import styled from "styled-components";
import Chart from "chart.js";
import WishCategoryModal from "../../components/WishCategoryModal";
import { colors } from "../../utils/color";
import { useRouter } from "next/router";
import useAPI from "../../utils/hook/useAPI";
import { useInView } from "react-intersection-observer";
import {
  getScoreAvg,
  mappingName,
  mappingScore,
} from "../../utils/handleScore";
import {
  AddWishListInput,
  CreateAndAddWishListInput,
} from "../../api/wishList";

function destination() {
  const [isWishOpened, setIsWishOpened] = useState(false);
  const chartRef = useRef(null);
  const router = useRouter();
  let { id } = router.query;
  const { ref, inView } = useInView();
  const api = useAPI();
  const { data: meta } = api.destination.getDestinationMeta();
  const { data: review, fetchNextPage } = api.destination.getDestinationReview(
    id as string
  );
  const { data: info, isLoading } = api.destination.getDestinationInfo(
    id as string
  );

  const { mutate: createAnddAdd } = api.wishList.fetchCreateAndAddWishList();
  const { mutate: Add } = api.wishList.fetchAddWishList();
  console.log("info :>> ", info);

  const onWishHandler = () => setIsWishOpened((prev) => !prev);

  const onWishClose = (e: MouseEvent<HTMLDivElement>) =>
    e.target === e.currentTarget &&
    e.target === e.currentTarget &&
    setIsWishOpened(false);

  const onClickCreateButton = (data: CreateAndAddWishListInput) => {
    createAnddAdd(data);
    setIsWishOpened(false);
  };

  const onClickWishList = (data: AddWishListInput) => {
    Add(data);
    setIsWishOpened(false);
  };

  useEffect(() => {
    if (chartRef.current && info && meta) {
      const {
        facilityRank,
        facilityScore,
        priceRank,
        priceScore,
        surroundRank,
        surroundScore,
        viewRank,
        viewScore,
      } = info.data.scoreDto;
      const labels = meta.categoryDummy.map(({ name }) => name);
      console.log("meta", labels);
      const chart = {
        labels,
        datasets: [
          {
            label: "Rank",
            data: [viewRank, priceRank, facilityRank, surroundRank],
            fill: true,
            backgroundColor: "rgba(255, 99, 132,0.2)",
            borderColor: "rgb(255, 99, 132)",
            pointBackgroundColor: "rgb(255, 99, 132)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgb(255, 99, 132)",
          },
          {
            label: "Score",
            data: [
              viewScore * 100,
              priceScore * 100,
              facilityScore * 100,
              surroundScore * 100,
            ],
            fill: true,
            backgroundColor: "rgba(0, 59, 253, 0.2)",
            borderColor: "blue",
            pointBackgroundColor: "blue",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "blue",
          },
        ],
      };

      const myChart = new Chart(chartRef.current, {
        type: "radar",
        data: chart,
        options: {
          responsive: true,
          title: {
            display: true,
            text: "순위 및 점수",
          },
          elements: {
            line: {
              borderWidth: 1,
            },
          },
        },
      });
      return () => {
        myChart.destroy();
      };
    }
  }, [info]);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, meta]);

  if (isLoading) return <div>loading...</div>;
  if (!info || !meta || !review) return <div>error</div>;
  return (
    <StyledDestination>
      <StyledTitle>{info.data.spotDto.name}</StyledTitle>
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
          <span>{getScoreAvg(info.data.scoreDto)}</span>
          <Link href="#review">{`후기 ${review.pages[0].reviewListDto.totalElements}개`}</Link>
          <div>{info.data.spotDto.address}</div>
        </StyledCommentWrapper>
        <StyledButtonWrapper>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill={info.data.isFavoriteSpot ? "salmon" : "none"}
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
          <button onClick={onWishHandler}>찜 하기</button>
          {isWishOpened && (
            <WishCategoryModal
              onClick={onClickWishList}
              onSubmit={onClickCreateButton}
              onClose={onWishClose}
              spotId={id as string}
            />
          )}
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
          <StyledDesc>{info.data.spotDto.description}</StyledDesc>
        </StyledInfo>
        <div>
          <canvas id="canvas" ref={chartRef}></canvas>
        </div>
      </StyledMain>
      <StyledReviewViewer>
        <StyledScoreWrapper>
          {meta.categoryDummy.map(({ id, name }) => (
            <StyledScore key={id}>
              {name} {mappingScore(info.data.scoreDto[mappingName(name)])} / 5.0{" "}
            </StyledScore>
          ))}
        </StyledScoreWrapper>
        <StyledReviewWrapper id="review">
          <StyledReviewContainer>
            {review.pages.map(({ reviewListDto }) =>
              reviewListDto.content.map(({ id, content }) => (
                <StyledReview key={id}>{content}</StyledReview>
              ))
            )}
            <div ref={ref}></div>
          </StyledReviewContainer>
        </StyledReviewWrapper>
      </StyledReviewViewer>
    </StyledDestination>
  );
}

export default destination;

const StyledDestination = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem 27rem;
  padding-bottom: 10rem;
  @media (max-width: 1300px) {
    padding: 0;
    padding-bottom: 10rem;
  }
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
    margin-right: 0.2rem;
  }
  & > a {
    border-bottom: 1px solid black;
    margin: 0.5rem;
  }
`;
const StyledButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  & > svg {
    width: 1.5rem;
    margin-right: 1rem;
  }
  & > button {
    font-size: 1rem;
    padding: 0;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid black;
    outline: none;
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

const StyledMain = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 2rem;

  & > div {
    flex-grow: 1;
  }
  & > div > canvas {
    width: 100%;
  }

  @media (max-width: 1600px) {
    flex-wrap: wrap;
  }

  @media (max-width: 1300px) {
    & > div {
      flex-grow: 0;
    }
  }
`;
const StyledInfo = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;

  @media (max-width: 1600px) {
    width: 100%;
    margin-bottom: 3rem;
  }
`;
const StyledInfoTitle = styled.div`
  font-size: 1.5rem;
  padding: 1rem 0;
  border-bottom: 1px solid lightgrey;
`;
const StyledDesc = styled.div`
  font-size: 1.1rem;
  padding: 1rem 0;
  line-height: 1.5rem;
`;

const StyledReviewViewer = styled.section`
  width: 100%;
  padding: 1rem 2rem;
  margin-top: 4rem;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${colors.lightgray};
`;

const StyledScoreWrapper = styled.ul`
  display: flex;
  justify-content: space-evenly;
  padding: 5rem 0;
`;

const StyledScore = styled.li`
  padding: 1rem 2rem;
  font-size: 1.2;
  font-weight: bold;
`;

const StyledReviewWrapper = styled.ul`
  position: relative;
  border: 1px solid ${colors.lightgray};
  border-radius: 0.5rem;
  padding: 2rem;
  height: 40rem;

  &::before {
    content: "Reviews";
    position: absolute;
    background-color: white;
    border-right: 20px solid white;
    border-left: 20px solid white;
    top: 0;
    left: 50%;
    font-size: 1.2rem;
    transform: translate(-50%, -50%);
    z-index: 3;
  }
`;

const StyledReviewContainer = styled.div`
  height: 100%;
  overflow-y: scroll;

  & > li:not(:last-child) {
    border-bottom: 1px solid ${colors.lightgray};
    margin-bottom: 3rem;
  }

  & > span {
    position: fixed;
    background-color: white;
    border: 20px solid white;
    top: 12rem;
    left: 50%;
    font-size: 1.2rem;
    transform: translate(-50%, -50%);
    z-index: 3;
  }
`;
const StyledReview = styled.li`
  padding: 1rem 0;
`;
