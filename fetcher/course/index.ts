export interface WishListByIdOutput {
  status: number;
  success: boolean;
  message: string;
  favoriteName: string;
  favoriteSpotListDtos: {
    spotId: number;
    spotName: string;
    spotAddress: string;
    spotDescription: string;
    url: string;
  }[];
}

export interface RecommendedSpotInput {
  spotIdList: number[];
}

export interface RecommendedSpotOutput {
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
