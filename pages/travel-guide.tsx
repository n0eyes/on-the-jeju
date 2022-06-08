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
  UPDATE_KEYWORD,
  CLEAR_KEYWORD,
  INIT_DATA,
} from "../reducer/travelGuide";
import { colors } from "../utils/color";
import useAPI from "../utils/hook/useAPI";
import { MutateOptions } from "react-query";
import SearchForm from "../components/SearchForm";
import { SearchTravelSpotInput } from "../api/travel";

type Tag = "location" | "category";
type OptionsOrKeyword = SearchOptions | string;

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
  const {
    mutate: search,
    data: searchedData,
    error: searchError,
  } = api.travel.searchTravelSpot();

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
          dispatch({ type: CLEAR_KEYWORD });
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

  const searchTravelSpot = (spotName: string) => {
    fetchIndex(spotName, {
      onSuccess: (payload) => {
        dispatch({ type: INIT_DATA, payload });
        dispatch({ type: UPDATE_KEYWORD, payload: spotName });
      },
    });
  };

  const onSubmitUserWeight = () => {
    if (state && state.searchOptions) {
      fetchIndex(state.searchOptions, {
        onSuccess: (data) => {
          dispatch({
            type: CHANGE_WEIGHT,
            payload: { searchOptions: state.searchOptions, data },
          });
          dispatch({ type: CLOSE_WEIGHT_MODAL });
          dispatch({ type: CLEAR_KEYWORD });
        },
      });
    }
  };

  // 리팩터링 포인트
  //POST > index/next 방식 > 대책 생각..

  const fetchIndex = (
    searchOptions: OptionsOrKeyword,
    options?: MutateOptions
  ) => {
    if (typeof searchOptions === "string") {
      console.log(searchOptions);
      search(
        {
          searchOptions: { spotName: searchOptions },
          pagination: { size: 108, page: 0 },
        },
        options
      );
    } else {
      mutate({ searchOptions, pagination: { size: 108, page: 0 } }, options);
    }
  };

  const fetchNextPage = (
    searchOptions: OptionsOrKeyword,
    options?: MutateOptions
  ) => {
    const page =
      spotData && !spotData.data.last
        ? spotData.data.pageable.pageNumber + 1
        : 0;

    if (typeof searchOptions === "string") {
      search(
        {
          searchOptions: { spotName: searchOptions },
          pagination: { size: 108, page },
        },
        options
      );
    } else {
      mutate({ searchOptions, pagination: { size: 108, page } }, options);
    }
  };

  useEffect(() => {
    if (state && inView) {
      const { searchOptions, searchKeyword } = state;
      const options = searchKeyword || searchOptions;

      fetchNextPage(options, {
        onSuccess: (payload) => dispatch({ type: UPDATE_DATA, payload }),
      });
    }
  }, [inView]);

  if (metaError || spotError) return null;
  if (!meta || !state) return null;
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
        <StyledSearchWrapper>
          <SearchForm search={searchTravelSpot} />
          <StyledPriority onClick={onModalHandler}>우선 순위</StyledPriority>
        </StyledSearchWrapper>
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
  grid-template-columns: repeat(auto-fill, minmax(31rem, 31rem));
  justify-content: space-between;
  grid-gap: 2rem;
`;

const StyledDestination = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  font-size: 1.2rem;
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
  height: 30rem;
  border-radius: 1rem;
`;

const StyledDescription = styled.div`
  position: absolute;
  width: 100%;
  height: 30rem;
  border-radius: 1rem;
  color: ${colors.white};
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  padding: 1rem;
  overflow-y: scroll;
  transition: opacity 0.3s;
  line-height: 2rem;
`;

const StyledSearchWrapper = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
`;
