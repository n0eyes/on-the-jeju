import {
  useFetchAddWishList,
  useFetchCreateAndAddWishList,
  useFetchDeleteWishListById,
  useFetchWishList,
} from "../../query/wishList/wishListQuery";
import { AxiosInstance } from "axios";
import { UseInfiniteQueryResult, UseMutationResult } from "react-query";
import withAuth from "../../utils/axios/withAuth";
import {
  AddWishListOutput,
  CreateAndAddWishListOutput,
  DeleteWishListById,
  WishListOutput,
} from "./index";
export interface WishListAPI {
  getWishList: () => UseInfiniteQueryResult<WishListOutput>;
  fetchCreateAndAddWishList: () => UseMutationResult<CreateAndAddWishListOutput>;
  fetchAddWishList: () => UseMutationResult<AddWishListOutput>;
  deleteWishListById: () => UseMutationResult<DeleteWishListById>;
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

    deleteWishListById: (): UseMutationResult<DeleteWishListById> =>
      useFetchDeleteWishListById(withAuth(request)),
  };
};

export const real = {};
