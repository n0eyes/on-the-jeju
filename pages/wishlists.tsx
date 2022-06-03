import Link from "next/link";
import React, { useEffect } from "react";
import styled from "styled-components";
import wishList from "../api/wishList/api";
import { useInView } from "react-intersection-observer";
import useAPI from "../utils/hook/useAPI";
function wishlists() {
  const { ref, inView } = useInView();
  const api = useAPI();
  const { data, fetchNextPage } = api.wishList.getWishList();

  console.log(data);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (!data) return <div>error</div>;
  return (
    <StyledTravelGuide>
      <StyledNav>
        <StyledTitle>위시 리스트</StyledTitle>
      </StyledNav>
      <StyledDestinationWrapper>
        {data.pages.map(({ favoriteListDtos }) =>
          favoriteListDtos.content.map(
            ({ favoriteId, favoriteName, spotURL }) => (
              <Link
                href={`/course-recommendation/${favoriteId}`}
                key={favoriteId}
              >
                <StyledDestination>
                  <StyledThumbnailWrapper>
                    <StyledThumbnail
                      src={
                        favoriteListDtos.content[0].spotURL ||
                        "/assets/incheon.webp"
                      }
                    />
                    <StyledThumbnail
                      src={
                        favoriteListDtos.content[1].spotURL ||
                        "/assets/incheon.webp"
                      }
                    />
                    <StyledThumbnail
                      src={
                        favoriteListDtos.content[1].spotURL ||
                        "/assets/incheon.webp"
                      }
                    />
                  </StyledThumbnailWrapper>
                  <StyledDescription>{favoriteName}</StyledDescription>
                </StyledDestination>
              </Link>
            )
          )
        )}

        <div ref={ref} />
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
  padding: 0 7rem;
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
  cursor: pointer;
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
