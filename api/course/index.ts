export interface WishListInfoOutput {
  status: number;
  success: boolean;
  message: string;
  spotListDtoList: {
    spotId: number;
    spotName: string;
    spotAddress: string;
    spotDescription: string;
    url: string;
  }[];
}

export interface CourseRecommendationInput {
  spotIdList: number[];
}

export interface CourseRecommendationOutput {
  status: number;
  success: boolean;
  message: string;
  spotList: {
    spotId: number;
    spotName: string;
    spotAddress: string;
    spotDescription: string;
    url: string;
    location: string; //어느 읍인지
  }[][];
}
