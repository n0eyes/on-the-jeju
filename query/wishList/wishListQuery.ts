import { WishListModalOutput } from "./../../api/wishList/index";
import axios from "axios";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "react-query";

const queryClient = useQueryClient();

export const useFetchWishListModal = (
  query: string
): UseQueryResult<WishListModalOutput> =>
  useQuery("wishListModal", () =>
    axios("https://jsonplaceholder.typicode.com/todos/1")
  );

export const useFetchNewWishList = () =>
  useMutation(
    (info: {}) =>
      axios.post("https://jsonplaceholder.typicode.com/posts", {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        data: info,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("wishListModal"),
    }
  );
