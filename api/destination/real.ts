import { useFetchDestinationReview } from "./../../query/destination/destinationQuery";
import {
  DestinationInfoOutput,
  DestinationMetaOutput,
  DestinationReviewOutput,
} from "./index";
import {
  useFetchDestinationInfo,
  useFetchDestinationMeta,
} from "../../query/destination/destinationQuery";
import { UseInfiniteQueryResult, UseQueryResult } from "react-query";
import { AxiosInstance } from "axios";
import withAuth from "../../utils/axios/withAuth";

export interface DestinationAPI {
  getDestinationInfo: (spotId: string) => UseQueryResult<DestinationInfoOutput>;
  getDestinationReview: (
    spotId: string
  ) => UseInfiniteQueryResult<DestinationReviewOutput>;
  getDestinationMeta: () => UseQueryResult<DestinationMetaOutput>;
}

export const createDestinationAPI = (
  request: AxiosInstance
): DestinationAPI => {
  return {
    getDestinationInfo: (
      spotId: string
    ): UseQueryResult<DestinationInfoOutput> =>
      useFetchDestinationInfo(withAuth(request), spotId),

    getDestinationMeta: (): UseQueryResult<DestinationMetaOutput> =>
      useFetchDestinationMeta(withAuth(request)),

    getDestinationReview: (
      spotId: string
    ): UseInfiniteQueryResult<DestinationReviewOutput> =>
      useFetchDestinationReview(withAuth(request), spotId),
  };
};
