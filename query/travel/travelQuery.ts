import {
  Pagination,
  SearchTravelSpotInput,
  TravelMetaOutput,
  TravelSearchOptions,
  TravelSpotInput,
  TravelSpotOutput,
} from "../../fetcher/travel/index";
import { AxiosInstance, AxiosPromise } from "axios";
import { useMutation, useQuery } from "react-query";
import createQuery from "../../utils/createQuery";

export const useFetchTravelSpot = (request: AxiosInstance) =>
  useMutation(
    ({
      searchOptions,
      pagination,
    }: TravelSearchOptions<
      TravelSpotInput,
      Pagination
    >): Promise<TravelSpotOutput> => {
      const query = createQuery(pagination);
      return fetchTravelSpot(request, query, searchOptions);
    }
  );

const fetchTravelSpot = async (
  request: AxiosInstance,
  query: string,
  searchOptions: TravelSpotInput
) => {
  const { data } = await request.post(
    `/user/spotList/priority?${query}`,
    searchOptions
  );
  return data;
};

export const useFetchTravelMeta = (request: AxiosInstance) =>
  useQuery(
    "meta",
    (): AxiosPromise<TravelMetaOutput> => request("/spotList/metaData")
  );

export const useFetchSearchTravelSpot = (request: AxiosInstance) =>
  useMutation(
    ({
      searchOptions,
      pagination,
    }: TravelSearchOptions<
      SearchTravelSpotInput,
      Pagination
    >): Promise<TravelSpotOutput> => {
      const query = createQuery(pagination);
      return fetchSearchTravelSpot(request, query, searchOptions);
    }
  );

const fetchSearchTravelSpot = async (
  request: AxiosInstance,
  query: string,
  searchOptions: SearchTravelSpotInput
) => {
  const { data } = await request.post(
    `/user/spotList/search?${query}`,
    searchOptions
  );
  return data;
};
