import { AxiosInstance } from "axios";
import {
  DestinationInfoOutput,
  DestinationMetaOutput,
  DestinationReviewOutput,
} from "./../../api/destination/index";
import { useInfiniteQuery, useQuery } from "react-query";
import createQuery from "../../utils/createQuery";

export const useFetchDestinationInfo = (
  request: AxiosInstance,
  spotId: string
) => {
  return useQuery(
    ["destination"],
    (): Promise<DestinationInfoOutput> => fetchDestinationInfo(request, spotId),
    {
      enabled: !!spotId,
    }
  );
};

const fetchDestinationInfo = async (
  request: AxiosInstance,
  spotId: string
): Promise<DestinationInfoOutput> => {
  const { data } = await request(`/user/spot/${spotId}`);
  return data;
};

export const useFetchDestinationReview = (
  request: AxiosInstance,
  spotId: string
) => {
  return useInfiniteQuery(
    ["review", spotId],
    ({ pageParam = 0 }): Promise<DestinationReviewOutput> => {
      const query = createQuery({ size: 10, page: pageParam });
      return fetchDestinationReview(request, spotId, query);
    },
    {
      getNextPageParam: (page) =>
        page.reviewListDto.last
          ? undefined
          : page.reviewListDto.pageable.pageNumber + 1,

      enabled: !!spotId,
    }
  );
};

const fetchDestinationReview = async (
  request: AxiosInstance,
  spotId: string,
  query: string
): Promise<DestinationReviewOutput> => {
  const { data } = await request(`/user/spot/review/${spotId}?${query}`);
  return data;
};

export const useFetchDestinationMeta = (request: AxiosInstance) => {
  return useQuery(
    ["meta"],
    (): Promise<DestinationMetaOutput> => fetchDestinationMeta(request)
  );
};

const fetchDestinationMeta = async (
  request: AxiosInstance
): Promise<DestinationMetaOutput> => {
  const { data } = await request(`/spot/metaData`);
  return data;
};
