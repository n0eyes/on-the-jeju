import {
  CreateNewWishListInput,
  CreateNewWishListOutput,
  WishListModalInput,
  WishListModalOutput,
} from "./index";
export const mock = {
  getWishListModal(searchOptions: WishListModalInput) {
    const response: WishListModalOutput = {
      status: 200,
      success: true,
      message: "success",
      favoriteDtoPage: {
        content: [
          {
            id: 3,
            name: "1일차",
          },
          {
            id: 4,
            name: "2일차",
          },
        ],
      },
      pageable: {
        sort: {
          empty: true,
          unsorted: true,
          sorted: false,
        },
        offset: 0,
        pageNumber: 0,
        pageSize: 10,
        paged: true,
        unpaged: false,
      },
      last: false,
      totalPages: 5,
      totalElements: 50,
      number: 0,
      sort: {
        empty: true,
        unsorted: true,
        sorted: false,
      },
      size: 10,
      first: true,
      numberOfElements: 10,
      empty: false,
    };

    return response;
  },
  createNewWishList() {
    const response: CreateNewWishListOutput = {
      status: 200,
      success: true,
      message: "성공",
      data: {
        id: 1,
        name: "mock",
      },
    };
    return function mutate(info: CreateNewWishListInput) {
      return {
        ...response,
        data: info,
      };
    };
  },
};
