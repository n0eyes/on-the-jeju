import {
  AddWishListInput,
  AddWishListOutput,
  CreateAndAddWishListInput,
  CreateAndAddWishListOutput,
  DeleteWishListById,
  WishListOutput,
} from "../../fetcher/wishList/index";
import { AxiosInstance } from "axios";
import {
  QueryClient,
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useMutation,
} from "react-query";
import createQuery from "../../utils/createQuery";

const queryClient = new QueryClient();
export const useFetchWishList = (
  request: AxiosInstance
): UseInfiniteQueryResult<WishListOutput> =>
  useInfiniteQuery(
    "wishList",
    ({ pageParam = 0 }): Promise<WishListOutput> => {
      const query = createQuery({ size: 10, page: pageParam });
      return fetchWishList(request, query);
    },
    {
      getNextPageParam: (page) =>
        page.favoriteListDtos.last
          ? undefined
          : page.favoriteListDtos.pageable.pageNumber + 1,
    }
  );

const fetchWishList = async (
  request: AxiosInstance,
  query: string
): Promise<WishListOutput> => {
  const { data } = await request(`/user/favoriteList/?${query}`);
  return data;
};

export const useFetchCreateAndAddWishList = (request: AxiosInstance) =>
  useMutation(
    (form: CreateAndAddWishListInput): Promise<CreateAndAddWishListOutput> => {
      return fetchCreateAndAddWishList(request, form);
    },
    {
      onSuccess: () =>
        queryClient.invalidateQueries("destination", {
          refetchInactive: true,
        }),
    }
  );

const fetchCreateAndAddWishList = async (
  request: AxiosInstance,
  form: CreateAndAddWishListInput
) => {
  const { data } = await request.post(`/user/favorite/new`, form);
  return data;
};

export const useFetchAddWishList = (request: AxiosInstance) =>
  useMutation(
    (form: AddWishListInput): Promise<AddWishListOutput> => {
      return fetchAndAddWishList(request, form);
    },
    {
      onSuccess: () =>
        queryClient.invalidateQueries("destination", {
          refetchInactive: true,
        }),
    }
  );

const fetchAndAddWishList = async (
  request: AxiosInstance,
  form: AddWishListInput
) => {
  const { data } = await request.post(`/user/favorite/form`, form);
  return data;
};

export const useFetchDeleteWishListById = (request: AxiosInstance) =>
  useMutation(
    (id: string): Promise<DeleteWishListById> => {
      return fetchDeleteWishListById(request, id);
    },
    {
      onSuccess: () =>
        queryClient.invalidateQueries("wishList", {
          refetchInactive: true,
        }),
    }
  );

const fetchDeleteWishListById = async (request: AxiosInstance, id: string) => {
  const { data } = await request.delete(`/user/favoriteList/${id}`);
  return data;
};
