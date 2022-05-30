export interface WishListModalInput {
  size: number;
  page: number;
  [index: string]: number;
}

export interface WishListModalOutput {
  status: number;
  success: boolean;
  message: string;

  favoriteDtoPage: {
    content: {
      id: number;
      name: string;
    }[];
  };
  pageable: {
    sort: {
      empty: true;
      unsorted: true;
      sorted: false;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: true;
    unpaged: false;
  };
  last: false;
  totalPages: number;
  totalElements: number;
  number: number;
  sort: {
    empty: true;
    unsorted: true;
    sorted: false;
  };
  size: number;
  first: true;
  numberOfElements: number;
  empty: false;
}

export interface CreateNewWishListInput {
  spotId: number;
  favoriteName: string;
}

export interface CreateNewWishListOutput {
  status: number;
  success: boolean;
  message: string;
  data: {
    id: number;
    name: string;
  };
}
