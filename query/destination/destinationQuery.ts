import axios from "axios";
import { DestinationInput } from "./../../api/destination/index";
import { useQuery } from "react-query";

export const useFetchDestination = (params: DestinationInput) => {
  const { spotId, size, page } = params;
  return useQuery(["destination", params], () =>
    axios.get(`/${spotId}?size=${size}&page=${page}`)
  );
};
