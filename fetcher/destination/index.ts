export interface DestinationReviewOutput {
  status: number;
  success: boolean;
  message: string;
  reviewListDto: {
    content: {
      id: number;
      content: string; //리뷰 내용
    }[];

    pageable: {
      sort: {
        empty: true;
        unsorted: true;
        sorted: false;
      };
      offset: number;
      pageNumber: number;
      pageSize: number;
      paged: true;
      unpaged: false;
    };
    last: false;
    totalPages: number;
    totalElements: number;
    sort: {
      empty: true;
      unsorted: true;
      sorted: false;
    };
    first: true;
    number: number;
    size: number;
    numberOfElements: number;
    empty: false;
  };
}

export interface DestinationInfoInput {
  spotId: number;
  size: number;
  page: number;
}

export interface ScoreDto {
  id: number;
  viewScore: number; //뷰 점수
  priceScore: number; //가격 점수
  facilityScore: number; //시설 점수
  surroundScore: number; //주변 점수
  viewRank: number; //뷰 순위
  priceRank: number; //가격 순위
  facilityRank: number; //시설 순위
  surroundRank: number; //주변 순위
  [index: string]: number;
}
export interface DestinationInfoOutput {
  status: number;
  success: boolean;
  message: string;
  data: {
    spotDto: {
      id: number;
      name: string;
      address: string;
      description: string;
    };
    scoreDto: ScoreDto;
    pictureDto: {
      id: number;
      url: string; //사진 url
    }[];
    isFavoriteSpot: boolean;
  };
}

export interface DestinationMetaOutput {
  status: number;
  success: boolean;
  categoryDummy: {
    id: number;
    name: string;
  }[];
}
