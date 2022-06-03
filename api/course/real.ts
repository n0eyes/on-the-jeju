import { UseQueryResult } from "react-query";
import createQuery from "../../utils/createQuery";
import {
  useFetchNewWishList,
  useFetchWishListModal,
} from "./../../query/wishList/wishListQuery";
import { WishListModalInput, WishListModalOutput } from "./index";

export const real = {
  getWishListModal(
    searchOptions: WishListModalInput
  ): UseQueryResult<WishListModalOutput> {
    const query = createQuery(searchOptions);
    return useFetchWishListModal(query);
  },
  createNewWishList() {
    return useFetchNewWishList();
  },
};
