import { createRecommendationAPI, RecommendationAPI } from "./course/real";
import { createWishListAPI, WishListAPI } from "./wishList/real";
import { AxiosInstance } from "axios";
import { AXIOS_KEY } from "../utils/axios/axios";
import { AuthAPI, createAuthAPI } from "./auth/real";
import { createDestinationAPI, DestinationAPI } from "./destination/real";
import { createTravelAPI, TravelAPI } from "./travel/real";

export interface APIService {
  auth: AuthAPI;
  travel: TravelAPI;
  destination: DestinationAPI;
  wishList: WishListAPI;
  recommendation: RecommendationAPI;
}

type Config = {
  [key in AXIOS_KEY]: AxiosInstance;
};

export function createAPIService(config: Config): APIService {
  const { axiosBasic, axiosLogin, axiosWithAuth } = config;
  const auth = createAuthAPI(axiosLogin);
  const travel = createTravelAPI(axiosWithAuth);
  const destination = createDestinationAPI(axiosWithAuth);
  const wishList = createWishListAPI(axiosWithAuth);
  const recommendation = createRecommendationAPI(axiosWithAuth);

  return {
    auth,
    travel,
    destination,
    wishList,
    recommendation,
  };
}
