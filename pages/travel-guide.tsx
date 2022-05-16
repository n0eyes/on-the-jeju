import Link from "next/link";
import React, { useEffect, useReducer, useState } from "react";
import styled, { css } from "styled-components";
import travel from "../api/travel/api";
import PriorityModal from "../components/PriorityModal";
import WishCategoryModal from "../components/WishCategoryModal";
import {
  TravelReducer,
  initialState,
  CHANGE_OPTION,
  TOGGLE_WEIGHT_MODAL,
  TOGGLE_WISH_MODAL,
  CLOSE_WEIGHT_MODAL,
  CLOSE_WISH_MODAL,
} from "../reducer/travelGuide";
import axios from "../utils/axios/axios";
import { colors } from "../utils/color";

const REGION_DUMMY = [
  { id: 1, name: "동부" },
  { id: 2, name: "서부" },
  { id: 3, name: "전체" },
];
const TAGS_DUMMY = [
  { id: 4, name: "뷰" },
  { id: 5, name: "카페 및 식당" },
  { id: 6, name: "가격" },
  { id: 7, name: "편의시설" },
];

type Tag = "location" | "category";

interface SpotList {
  spotId: number; //관광지 번호
  spotName: string | null; //"관광지 이름",
  spotAddress: string | null; //"관광지 주소"
  spotDescription: string | null; //"이러이러한 관관광지이다",
  url: string; //관광지 사진 url
}

function travelGuide() {
  const [state, dispatch] = useReducer(TravelReducer, initialState);
  const [spotList, setSpotList] = useState<SpotList[]>([]);

  const onModalHandler = () => dispatch({ type: TOGGLE_WEIGHT_MODAL });
  const onModalClose = (e: MouseEvent) =>
    e.target === e.currentTarget && dispatch({ type: CLOSE_WEIGHT_MODAL });

  const onWishHandler = () => dispatch({ type: TOGGLE_WISH_MODAL });
  const onWishClose = (e: MouseEvent) =>
    e.target === e.currentTarget && dispatch({ type: CLOSE_WISH_MODAL });

  const onClick = (id: number, method: Tag) => {
    let option;

    if (method === "location") {
      option = REGION_DUMMY.filter((dummy) => dummy.id === id)[0].name;
    } else if (method === "category") {
      option = TAGS_DUMMY.filter((dummy) => dummy.id === id)[0].name;
    }

    dispatch({
      type: CHANGE_OPTION,
      payload: { id, method, option },
    });
  };

  useEffect(() => {
    if (state?.searchOptions) {
      const travelSpotMutation = travel.getTravelSpot(state.searchOptions);
      const { data } = travelSpotMutation.mutate(state.searchOptions);
      setSpotList(data.content);
    }
  }, []);

  return (
    <StyledTravelGuide>
      <StyledNav>
        <StyledRegionWrapper>
          {REGION_DUMMY.map(({ id, name }) => (
            <StyledTag
              key={id}
              onClick={() => onClick(id, "location")}
              selected={state?.locationId === id}
            >
              {name}
            </StyledTag>
          ))}
        </StyledRegionWrapper>
        <StyledTagWrapper>
          {TAGS_DUMMY.map(({ id, name }) => (
            <StyledTag
              key={id}
              onClick={() => onClick(id, "category")}
              selected={state?.categoryId === id}
            >
              {name}
            </StyledTag>
          ))}
        </StyledTagWrapper>
        <StyledPriority onClick={onModalHandler}>우선 순위</StyledPriority>
      </StyledNav>
      <StyledDestinationWrapper>
        {spotList.map(({ spotId, url, spotName, spotDescription }) => (
          <Link href={`/destination/${spotId}`} key={spotId}>
            <StyledDestination key={spotId}>
              <StyledThumbnail src={url} alt={`${spotName}`} />
              <StyledDescription>{spotDescription}</StyledDescription>
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
          </Link>
        ))}
      </StyledDestinationWrapper>
      {state?.isWeightOpened && <PriorityModal onClose={onModalClose} />}
      {state?.isWishOpened && <WishCategoryModal onClose={onWishClose} />}
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
`;
const StyledTagWrapper = styled.div`
  display: flex;

  & > li {
    margin-right: 1.5rem;
  }
`;
const StyledTag = styled.li<{
  selected: boolean;
}>`
  color: gray;
  padding-bottom: 0.5rem;
  cursor: pointer;
  ${({ selected }) =>
    selected &&
    css`
      color: black;
      border-bottom: 1px solid black;
    `}
`;

const StyledPriority = styled.button`
  position: absolute;
  right: 0;
  border: none;
  color: black;
  background-color: ${colors.salmon};
  box-shadow: rgb(0 0 0 / 10%) 0px 4px 16px 0px;
  border-radius: 1rem;
  padding: 1rem 2rem;
  cursor: pointer;

  &:hover {
    box-shadow: rgb(0 0 0 / 15%) 0px 4px 16px 0px;
  }
`;

const StyledDestinationWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, auto));
  grid-gap: 1.5rem;
`;

const StyledDestination = styled.li`
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
    z-index: 3;
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
