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

  if (!data) return null;
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
                  <StyledThumbnail src={spotURL} />
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
  grid-template-columns: repeat(auto-fill, minmax(25rem, auto));
  grid-gap: 2rem;
`;

const StyledDestination = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  cursor: pointer;
`;

const StyledThumbnail = styled.img`
  width: 100%;
  height: 18rem;
  border-radius: 1rem;
`;

const StyledDescription = styled.div`
  font-size: 1.3rem;
  padding: 1rem 0;
  font-weight: bold;
`;
