import React from "react";
import styled from "styled-components";
function wishlists() {
  return (
    <StyledTravelGuide>
      <StyledNav>
        <StyledTitle>위시 리스트</StyledTitle>
        <StyledRecommend>최단 경로 추천</StyledRecommend>
      </StyledNav>
      <StyledDestinationWrapper>
        {[1, 2, 3].map(() => (
          <StyledDestination>
            <StyledThumbnailWrapper>
              <StyledThumbnail src="/assets/seoul.webp" />
              <StyledThumbnail src="/assets/daegu.webp" />
              <StyledThumbnail src="/assets/incheon.webp" />
            </StyledThumbnailWrapper>
            <StyledDescription>카테고리</StyledDescription>
          </StyledDestination>
        ))}
      </StyledDestinationWrapper>
    </StyledTravelGuide>
  );
}

export default wishlists;

const StyledTravelGuide = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 5rem;
`;

const StyledNav = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2.5rem 0;
`;

const StyledTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const StyledRecommend = styled.button`
  border: 2px solid powderblue;
  color: black;
  background-color: white;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
`;

const StyledDestinationWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, auto));
  grid-gap: 1.5rem;
`;

const StyledDestination = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const StyledThumbnailWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  & > img:first-child {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 3;
  }
`;

const StyledThumbnail = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 1rem;
`;

const StyledDescription = styled.div`
  padding: 1rem 0;
`;
