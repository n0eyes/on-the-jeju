export interface CommonResponse {
  status: number;
  success: boolean;
  message: string;
}

export interface WishListInput {
  size: number;
  page: number;
  [index: string]: number;
}

export interface WishListOutput extends CommonResponse {
  favoriteListDtos: {
    content: {
      favoriteId: number;
      favoriteName: string;
      spotURL: string;
    }[];
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
  };
}

export interface CreateAndAddWishListInput {
  spotId: string;
  favoriteName: string;
}

export interface AddWishListInput {
  spotId: string;
  favoriteId: number;
}

export interface CreateAndAddWishListOutput extends CommonResponse {
  data: {
    id: number;
    name: string;
  };
}
export interface AddWishListOutput {
  status: number;
  success: boolean;
  message: string;
  data: {
    id: number;
    name: string;
  };
}

export interface DeleteWishListById extends CommonResponse {}
