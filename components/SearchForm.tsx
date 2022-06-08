import React, { ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";
import { colors } from "../utils/color";

interface SearchFormProps {
  search: (spotName: string) => void;
}

function SearchForm(props: SearchFormProps) {
  const { search } = props;
  const [isOpened, setIsOpened] = useState(false);
  const [value, setValue] = useState("");

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isOpened) {
      setIsOpened(true);
      return;
    }

    search(value);
  };

  return (
    <StyledSearchForm onSubmit={onSubmit}>
      {isOpened && <StyledInput onChange={onChangeInput} value={value} />}
      <StyledSearchButton type="submit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="gray"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </StyledSearchButton>
    </StyledSearchForm>
  );
}

export default React.memo(SearchForm);

const StyledSearchForm = styled.form`
  display: flex;
  align-items: center;
  margin-right: 1.5rem;
`;

const StyledInput = styled.input`
  margin-right: 1rem;
  padding: 0.5rem 0.5rem;
  border: none;
  border-bottom: 1px solid ${colors.black};
  outline: none;
`;

const StyledSearchButton = styled.button`
  width: 2.5rem;
  background-color: transparent;
  border: none;
`;
