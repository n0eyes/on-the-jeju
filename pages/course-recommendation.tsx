import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "../utils/axios/axios";

function courseRecommendation() {
  const [myLocation, setMyLocation] = useState<
    { latitude: number; longitude: number } | string
  >("");

  useEffect(() => {
    async function test() {
      const data = await axios.get(
        "api/map/driving?start=127.1058342,37.359708&goal=129.075986,35.179470"
      );
    }
    test();
  }, []);

  //현재 위치를 추적합니다.
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }

    // 위치추적에 성공했을때 위치 값을 넣어줍니다.
    function success(position: {
      coords: { latitude: number; longitude: number };
    }) {
      setMyLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    }

    // 위치 추적에 실패 했을때 초기값을 넣어줍니다.
    function error() {
      setMyLocation({ latitude: 37.4979517, longitude: 127.0276188 });
    }
  }, []);

  const mapRef = useRef<HTMLElement | null | any>(null);

  useEffect(() => {
    if (typeof myLocation !== "string")
      mapRef.current = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(
          myLocation.latitude,
          myLocation.longitude
        ),
        zoomControl: true,
      });
  }, [mapRef, myLocation]);
  return (
    <StyledCourseRecommendation>
      <StyledSection>
        <StyledMainNav>
          <StyledMainTitle>추천 경로</StyledMainTitle>
          <StyledSettingButton>완료</StyledSettingButton>
        </StyledMainNav>
        <StyledCategoryWrapper>
          <StyledAccordion>
            <StyledCategory>
              <StyledCategoryTitle>가보고 싶은 곳</StyledCategoryTitle>
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
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
            </StyledCategory>
            <StyledDestination>
              <StyledThumbnail src="/assets/seoul.webp" />
              <StyledTitle>성산 일출봉</StyledTitle>
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </StyledDestination>
            <StyledDestination>
              <StyledThumbnail src="/assets/incheon.webp" />
              <StyledTitle>테마 파크</StyledTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </StyledDestination>
          </StyledAccordion>
          <StyledAccordion>
            <StyledCategory>
              <StyledCategoryTitle>카테고리 제목</StyledCategoryTitle>
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
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
            </StyledCategory>
          </StyledAccordion>
          <StyledAccordion>
            <StyledCategory>
              <StyledCategoryTitle>카테고리 제목</StyledCategoryTitle>
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
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
            </StyledCategory>
          </StyledAccordion>
        </StyledCategoryWrapper>
      </StyledSection>
      <StyledMapLayout id="map"></StyledMapLayout>
    </StyledCourseRecommendation>
  );
}

export default courseRecommendation;

const StyledCourseRecommendation = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 2rem 0;
  & > img {
    width: 50%;
  }
`;
const StyledSection = styled.div`
  width: 50%;
`;
const StyledMainNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 2rem;
`;
const StyledSettingButton = styled.button`
  padding: 0.5rem 1.5rem;
  background-color: transparent;
  border: 1px solid lightgray;
  border-radius: 0.5rem;
`;
const StyledMainTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;
const StyledCategoryWrapper = styled.div`
  width: 100%;
  padding: 1rem 2rem 1rem 0;
`;

const StyledAccordion = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 0;
`;
const StyledCategory = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 2rem 1rem;
  border-radius: 1rem;
  box-shadow: rgb(0 0 0 / 15%) 0px 4px 16px 0px;
  & > svg {
    width: 1.2rem;
  }
`;
const StyledCategoryTitle = styled.span`
  font-size: 1.2rem;
`;
const StyledDestination = styled.div`
  padding: 1rem 1rem;
  border: 1px solid lightgray;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  margin-top: 1.5rem;
  position: relative;

  & > svg {
    width: 1.5rem;
    position: absolute;
    right: 1rem;
  }
`;
const StyledThumbnail = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  margin-right: 0.5rem;
`;
const StyledTitle = styled.div`
  font-size: 0.9rem;
`;
const StyledMapLayout = styled.div`
  width: 30rem;
  height: 30rem;
`;
