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
  // const project = createProjectAPIReal(axiosClient);
  // const userProfile = createUserProfileReal(axiosClient);

  return {
    auth,
    travel,
    destination,
    wishList,
    // project,
    // userProfile,
    // poke,
  };
}
