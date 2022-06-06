import { useRouter } from "next/router";
import React, { MouseEvent, useEffect, useReducer } from "react";
import styled, { css } from "styled-components";
import UserWeightModal from "../components/UserWeightModal";
import { useInView } from "react-intersection-observer";
import {
  TravelReducer,
  initialState,
  CHANGE_OPTION,
  TOGGLE_WEIGHT_MODAL,
  CLOSE_WEIGHT_MODAL,
  INCREASE_USER_WEIGHT,
  DECREASE_USER_WEIGHT,
  UPDATE_DATA,
  SearchOptions,
  CHANGE_WEIGHT,
} from "../reducer/travelGuide";
import { colors } from "../utils/color";
import useAPI from "../utils/hook/useAPI";
import { MutateOptions } from "react-query";

type Tag = "location" | "category";

function travelGuide() {
  const [state, dispatch] = useReducer(TravelReducer, initialState);
  const { ref, inView } = useInView();
  const router = useRouter();
  const api = useAPI();
  const {
    mutate,
    data: spotData,
    error: spotError,
  } = api.travel.getTravelSpot();
  const { data: meta, error: metaError } = api.travel.getTravelMeta();

  const onModalHandler = () => dispatch({ type: TOGGLE_WEIGHT_MODAL });
  const onModalClose = (e: MouseEvent<HTMLDivElement>) =>
    e.target === e.currentTarget && dispatch({ type: CLOSE_WEIGHT_MODAL });

  const onClickOptions = (id: number, method: Tag) => {
    let option = "";

    if (meta && method === "location") {
      option = meta.data.regionDummy.filter((meta) => meta.id === id)[0].name;
    } else if (meta && method === "category") {
      option = meta.data.categoryDummy.filter((meta) => meta.id === id)[0].name;
    }
    if (state) {
      const searchOptions = {
        ...state.searchOptions,
        [method]: option,
      };

      fetchIndex(searchOptions, {
        onSuccess: (data) => {
          dispatch({
            type: CHANGE_OPTION,
            payload: { id, method, option, data },
          });
        },
      });
    }
  };

  const onClickUserWeight = (method: "+" | "-", i: number) => {
    if (method === "+") {
      dispatch({
        type: INCREASE_USER_WEIGHT,
        payload: i,
      });
    } else if (method === "-") {
      dispatch({
        type: DECREASE_USER_WEIGHT,
        payload: i,
      });
    }
  };

  const onSubmitUserWeight = () => {
    if (state && state.searchOptions) {
      console.log(state.searchOptions);
      fetchIndex(state.searchOptions, {
        onSuccess: (data) => {
          dispatch({
            type: CHANGE_WEIGHT,
            payload: { searchOptions: state.searchOptions, data },
          });
          dispatch({ type: CLOSE_WEIGHT_MODAL });
        },
      });
    }
  };

  // 리팩터링 포인트
  const fetchIndex = (
    searchOptions: SearchOptions,
    options?: MutateOptions
  ) => {
    mutate({ searchOptions, pagination: { size: 18, page: 0 } }, options);
  };

  const fetchNextPage = (
    searchOptions: SearchOptions,
    options?: MutateOptions
  ) => {
    let page = 0;
    if (spotData && !spotData.data.last) {
      page = spotData.data.pageable.pageNumber + 1;
    }
    mutate({ searchOptions, pagination: { size: 18, page } }, options);
  };

  useEffect(() => {
    if (state && inView) {
      const { searchOptions } = state;
      fetchNextPage(searchOptions, {
        onSuccess: (payload) => dispatch({ type: UPDATE_DATA, payload }),
      });
    }
  }, [inView]);

  if (metaError || spotError) return <div>Error</div>;
  if (!meta || !state) return <div>Loading...</div>;
  return (
    <StyledTravelGuide>
      <StyledNav>
        <StyledRegionWrapper>
          {meta.data.regionDummy.map(({ id, name }) => (
            <StyledTag
              key={id}
              onClick={() => onClickOptions(id, "location")}
              selected={state?.locationId === id}
            >
              {name}
            </StyledTag>
          ))}
        </StyledRegionWrapper>
        <StyledTagWrapper>
          {meta.data.categoryDummy.map(({ id, name }) => (
            <StyledTag
              key={id}
              onClick={() => onClickOptions(id, "category")}
              selected={state?.categoryId === id}
            >
              {name}
            </StyledTag>
          ))}
        </StyledTagWrapper>
        <StyledPriority onClick={onModalHandler}>우선 순위</StyledPriority>
      </StyledNav>
      <StyledDestinationWrapper>
        {state.spotList.map(
          ({ spotId, url, spotName, spotDescription, spotAddress }) => (
            <StyledDestination
              onClick={() => router.push(`/destination/${spotId}`)}
              key={spotId}
            >
              <StyledThumbnail
                src={url.length === 0 ? "/assets/daegu.webp" : url}
                alt={`${spotName}`}
              />
              <StyledSimpleInfo>
                <div>{spotName}</div>
                <div>{spotAddress}</div>
              </StyledSimpleInfo>
              <StyledDescription>
                {spotDescription?.includes("No") ? "" : spotDescription}
              </StyledDescription>
            </StyledDestination>
          )
        )}
      </StyledDestinationWrapper>
      <div ref={ref}></div>

      {state?.isWeightOpened && (
        <UserWeightModal
          meta={meta.data.categoryDummy.slice(1)}
          weight={state.searchOptions.userWeight}
          onClose={onModalClose}
          onClick={onClickUserWeight}
          onSubmit={onSubmitUserWeight}
        />
      )}
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
  padding: 0 7rem;
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
  color: ${colors.white};
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
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(25.5rem, 25.5rem));
  justify-content: center;
  grid-gap: 2rem;
`;

const StyledDestination = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  cursor: pointer;
  &:hover {
    & > div:last-child {
      opacity: 1;
    }
  }
`;
const StyledSimpleInfo = styled.div`
  width: 100%;
  height: 2rem;
  margin-top: 0.5rem;
  div:first-child {
    font-weight: 500;
    font-size: 1.3rem;
  }
  div:last-child {
    font-size: 0.9rem;
    color: gray;
    padding: 0.5rem 0;
  }
`;
const StyledThumbnail = styled.img`
  width: 100%;
  height: 18rem;
  border-radius: 1rem;
`;

const StyledDescription = styled.div`
  position: absolute;
  width: 100%;
  height: 18rem;
  border-radius: 1rem;
  color: ${colors.white};
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  padding: 1rem;
  overflow-y: scroll;
  transition: opacity 0.3s;
  line-height: 1.5rem;
`;
