import {
  useFetchRecommendedSpot,
  useFetchWishListById,
} from "../../query/recommendation/recommendationQuery";
import { AxiosInstance } from "axios";
import { UseMutationResult, UseQueryResult } from "react-query";
import { RecommendedSpotOutput, WishListByIdOutput } from "./index";
import withAuth from "../../utils/axios/withAuth";

export interface RecommendationAPI {
  getWishListById: (id: string) => UseQueryResult<WishListByIdOutput>;
  getRecommendedSpot: () => UseMutationResult<RecommendedSpotOutput>;
}

export const createRecommendationAPI = (
  request: AxiosInstance
): RecommendationAPI => {
  return {
    getWishListById: (id: string): UseQueryResult<WishListByIdOutput> =>
      useFetchWishListById(withAuth(request), id),

    getRecommendedSpot: () => useFetchRecommendedSpot(withAuth(request)),
  };
};

export const real = {};
