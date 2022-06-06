import {
  RecommendedSpotInput,
  RecommendedSpotOutput,
  WishListByIdOutput,
} from "./../../api/course/index";
import { AxiosInstance } from "axios";
import { useMutation, useQuery } from "react-query";

export const useFetchWishListById = (request: AxiosInstance, id: string) => {
  return useQuery(
    ["wishList", id],
    (): Promise<WishListByIdOutput> => fetchWishListById(request, id),
    {
      enabled: !!id,
    }
  );
};

const fetchWishListById = async (
  request: AxiosInstance,
  id: string
): Promise<WishListByIdOutput> => {
  const { data } = await request(`/user/route/spot/${id}`);
  return data;
};

export const useFetchRecommendedSpot = (request: AxiosInstance) => {
  return useMutation(
    ({
      id,
      spotList,
    }: {
      id: string;
      spotList: RecommendedSpotInput;
    }): Promise<RecommendedSpotOutput> =>
      fetchRecommendedSpot(request, id, spotList)
  );
};

const fetchRecommendedSpot = async (
  request: AxiosInstance,
  id: string,
  spotList: RecommendedSpotInput
): Promise<RecommendedSpotOutput> => {
  const { data } = await request.post(`/user/route/topList/${id}`, spotList);
  return data;
};
