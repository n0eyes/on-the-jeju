import { DestinationInput, DestinationOutput } from "./index";
import { useFetchDestination } from "../../query/destination/destinationQuery";
import { UseQueryResult } from "react-query";
import { AxiosResponse } from "axios";

export const real = {
  getDestinationInfo(
    params: DestinationInput
  ): UseQueryResult<AxiosResponse<DestinationOutput>> {
    return useFetchDestination(params);
  },
};
