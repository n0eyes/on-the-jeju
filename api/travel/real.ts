import { TravelSpotInput, TravelSpotOutput } from "./index";
import { UseMutationResult } from "react-query";
import { useFetchTravelSpot } from "../../query/travel/travelQuery";

export const real = {
  getTravelSpot(
    searchOptions: TravelSpotInput
  ): UseMutationResult<TravelSpotOutput> {
    return useFetchTravelSpot(searchOptions);
  },
  register() {},
};
