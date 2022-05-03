import React, { useState } from "react";
import styled from "styled-components";
import PriorityModal from "../components/PriorityModal";
import WishCategoryModal from "../components/WishCategoryModal";
function travelGuide() {
  const REGION_DUMMY = ["동부", "서부"];
  const TAGS_DUMMY = ["뷰", "카페 및 식당", "가격", "편의시설"];

  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isWishOpened, setIsWishOpened] = useState(false);

  const onModalHandler = () => setIsModalOpened((prev) => !prev);
  const onModalClose = (e) =>
    e.target === e.currentTarget && setIsModalOpened(false);

  const onWishHandler = () => setIsWishOpened((prev) => !prev);
  const onWishClose = (e) =>
    e.target === e.currentTarget && setIsWishOpened(false);

  return (
    <StyledTravelGuide>
      <StyledNav>
        <StyledRegionWrapper>
          {REGION_DUMMY.map((tag, i) => (
            <StyledTag key={i}>{tag}</StyledTag>
          ))}
        </StyledRegionWrapper>
        <StyledTagWrapper>
          {TAGS_DUMMY.map((tag, i) => (
            <StyledTag key={i}>{tag}</StyledTag>
          ))}
        </StyledTagWrapper>
        <StyledPriority onClick={onModalHandler}>우선 순위</StyledPriority>
      </StyledNav>
      <StyledDestinationWrapper>
        {[1, 2, 3, 4, , 5, 6, 7, 8].map((_, i) => (
          <StyledDestination key={i}>
            <StyledThumbnail src="/assets/seoul.webp" />
            <StyledDescription>관광지 정보</StyledDescription>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              onClick={onWishHandler}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </StyledDestination>
        ))}
      </StyledDestinationWrapper>
      {isModalOpened && <PriorityModal onClose={onModalClose} />}
      {isWishOpened && <WishCategoryModal onClose={onWishClose} />}
    </StyledTravelGuide>
  );
}

export default travelGuide;

const StyledTravelGuide = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 5rem;
`;

const StyledNav = styled.ul`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2.5rem 0;

  & > div:first-child {
    margin-bottom: 1rem;
  }
`;

const StyledRegionWrapper = styled.div`
  display: flex;

  & > li {
    margin-right: 1.5rem;
  }
  & > li:first-child {
    color: black;
    border-bottom: 1px solid black;
  }
`;
const StyledTagWrapper = styled.div`
  display: flex;

  & > li {
    margin-right: 1.5rem;
  }

  & > li:nth-child(2) {
    color: black;
    border-bottom: 1px solid black;
  }
`;
const StyledTag = styled.li`
  color: gray;
  padding-bottom: 0.5rem;
`;

const StyledPriority = styled.button`
  position: absolute;
  right: 0;
  border: none;
  color: black;
  background-color: white;
  box-shadow: rgb(0 0 0 / 10%) 0px 4px 16px 0px;
  border-radius: 1rem;
  padding: 1rem 2rem;
  cursor: pointer;

  &:hover {
    box-shadow: rgb(0 0 0 / 15%) 0px 4px 16px 0px;
  }
`;

const StyledDestinationWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 1.5rem;
`;

const StyledDestination = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  & > svg {
    position: absolute;
    right: 1rem;
    top: 1rem;
    width: 1.6rem;
    color: black;
    cursor: pointer;
  }
`;

const StyledThumbnail = styled.img`
  width: 100%;
  height: 18rem;
  border-radius: 1rem;
`;

const StyledDescription = styled.div`
  padding: 1rem 0;
`;
