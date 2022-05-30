import { TravelSpotInput, TravelSpotOutput } from "./../../api/travel/index";
import axios from "axios";
import { useMutation } from "react-query";

export const useFetchTravelSpot = () =>
  useMutation(
    (): Promise<TravelSpotOutput> => {
      return axios.post("/user/spotList", {});
    },
    {
      onSuccess() {},
    }
  );
