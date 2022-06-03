import {
  useFetchTravelMeta,
  useFetchTravelSpot,
} from "./../../query/travel/travelQuery";
import { TravelMetaOutput, TravelSpotOutput } from "./index";
import { UseMutationResult, UseQueryResult } from "react-query";
import { AxiosInstance, AxiosResponse } from "axios";
import withAuth from "../../utils/axios/withAuth";

export interface TravelAPI {
  getTravelSpot: () => UseMutationResult<TravelSpotOutput>;
  getTravelMeta: () => UseQueryResult<AxiosResponse<TravelMetaOutput>>;
}

export const createTravelAPI = (request: AxiosInstance): TravelAPI => {
  return {
    getTravelSpot: (): UseMutationResult<TravelSpotOutput> =>
      useFetchTravelSpot(withAuth(request)),

    getTravelMeta: (): UseQueryResult<AxiosResponse<TravelMetaOutput>> =>
      useFetchTravelMeta(request),
  };
};
