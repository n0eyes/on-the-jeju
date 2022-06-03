import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { colors } from "../utils/color";
import { darken } from "polished";
import { AddWishListInput, CreateAndAddWishListInput } from "../api/wishList";
import useAPI from "../utils/hook/useAPI";
import { useInView } from "react-intersection-observer";

interface WishCategoryModal {
  onClick: (data: AddWishListInput) => void;
  onSubmit: (data: CreateAndAddWishListInput) => void;
  onClose: (e: MouseEvent<HTMLDivElement>) => void;
  spotId: string;
}

function WishCategoryModal(props: WishCategoryModal) {
  const {
    onSubmit: createNewWishList,
    onClick: AddNewWishList,
    onClose,
    spotId,
  } = props;

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newWishListName, setNewWishListName] = useState<string>("");
  const { ref, inView } = useInView();
  const api = useAPI();
  const { data, fetchNextPage } = api.wishList.getWishList();
  console.log(data);
  const toggleMode = () => setIsEditing((prev) => !prev);

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setNewWishListName(e.target.value);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (!data) return <div>Error</div>;
  return (
    <StyledBackground onClick={onClose}>
      <StyledModal>
        <StyledModalHeader>
          위시리스트
          {isEditing && <button onClick={toggleMode}>X</button>}
        </StyledModalHeader>
        <StyledModalBody>
          {isEditing ? (
            <>
              <StyledInput placeholder="이름" onChange={onChange} />
              <StyledButtonWrapper>
                <StyledNewButton
                  disabled={!newWishListName.length}
                  onClick={() =>
                    createNewWishList({ spotId, favoriteName: newWishListName })
                  }
                >
                  새로 만들기
                </StyledNewButton>
              </StyledButtonWrapper>
            </>
          ) : (
            <>
              <StyledListWrapper onClick={toggleMode}>
                <StyledAddButton>+</StyledAddButton>
                <StyledAddDesc>새로운 위시리스트 만들기</StyledAddDesc>
              </StyledListWrapper>
              {data.pages.map(({ favoriteListDtos }) =>
                favoriteListDtos.content.map(
                  ({ favoriteId, favoriteName, spotURL }) => (
                    <StyledListWrapper
                      key={favoriteId}
                      onClick={() => AddNewWishList({ spotId, favoriteId })}
                    >
                      <StyledThumbnail src={spotURL} />
                      <StyledCategoryTitle>{favoriteName}</StyledCategoryTitle>
                    </StyledListWrapper>
                  )
                )
              )}
              <div ref={ref}></div>
            </>
          )}
        </StyledModalBody>
      </StyledModal>
    </StyledBackground>
  );
}

export default WishCategoryModal;

const StyledBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 999;
`;

const StyledModal = styled.div`
  width: 35rem;
  background-color: white;
  border-radius: 1rem;
  box-shadow: rgb(0 0 0 / 25%) 0px 4px 16px 0px;

  @keyframes open {
    from {
      opacity: 0;
      transform: translateY(200px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  animation: open 0.5s;
`;

const StyledModalHeader = styled.div`
  position: relative;
  width: 100%;
  height: 5rem;
  font-size: 1.5rem;
  border-bottom: 1px solid lightgrey;
  display: flex;
  justify-content: center;
  align-items: center;

  & > button {
    position: absolute;
    top: 1rem;
    left: 1rem;
    font-size: 1rem;
    border: none;
    background-color: transparent;
  }
`;
const StyledModalBody = styled.div`
  width: 100%;
  max-height: 30rem;
  overflow-y: scroll;
  padding: 1rem 1rem;

  & > div + div {
    margin-top: 1rem;
  }
`;
const StyledListWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const StyledAddButton = styled.button`
  width: 5rem;
  height: 5rem;
  border: 1px solid lightgrey;
  border-radius: 1rem;
  background-color: transparent;
  font-size: 2rem;
  margin-right: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledAddDesc = styled.div`
  font-size: 1.2rem;
`;
const StyledThumbnail = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 1rem;
  margin-right: 1rem;
`;
const StyledCategoryTitle = styled.div`
  font-size: 1.2rem;
`;
const StyledInput = styled.input`
  width: 100%;
  border: 1px solid ${colors.lightgray};
  border-radius: 0.5rem;
  outline-color: ${colors.black};
  padding: 1rem 1rem;
`;
const StyledButtonWrapper = styled.div`
  margin: 5rem -1rem 0 -1rem;
  padding: 1rem 1rem 0 1rem;
  border-top: 1px solid ${colors.lightgray};
`;
const StyledNewButton = styled.button`
  width: 100%;
  border-radius: 0.5rem;
  border: none;
  padding: 1rem 0;
  font-size: 1rem;
  color: ${colors.white};
  background-color: ${colors.salmon};

  &:hover {
    background-color: ${darken(0.03, colors.salmon)};
  }
  &:disabled {
    background-color: ${colors.lightgray};
  }
`;
