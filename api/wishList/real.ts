import {
  useFetchAddWishList,
  useFetchCreateAndAddWishList,
  useFetchWishList,
} from "./../../query/wishList/wishListQuery";
import { AxiosInstance } from "axios";
import { UseInfiniteQueryResult, UseMutationResult } from "react-query";
import withAuth from "../../utils/axios/withAuth";
import {
  AddWishListOutput,
  CreateAndAddWishListOutput,
  WishListOutput,
} from "./index";
export interface WishListAPI {
  getWishList: () => UseInfiniteQueryResult<WishListOutput>;
  fetchCreateAndAddWishList: () => UseMutationResult<CreateAndAddWishListOutput>;
  fetchAddWishList: () => UseMutationResult<AddWishListOutput>;
}

export const createWishListAPI = (request: AxiosInstance): WishListAPI => {
  return {
    getWishList: (): UseInfiniteQueryResult<WishListOutput> =>
      useFetchWishList(withAuth(request)),

    fetchCreateAndAddWishList:
      (): UseMutationResult<CreateAndAddWishListOutput> =>
        useFetchCreateAndAddWishList(withAuth(request)),

    fetchAddWishList: (): UseMutationResult<AddWishListOutput> =>
      useFetchAddWishList(withAuth(request)),
  };
};

export const real = {};
