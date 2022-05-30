export interface TravelSpotInput {
  location: string;
  category: string | null;
  userWeight: {
    viewWeight: number;
    priceWeight: number;
    facilityWeight: number;
    surroundWeight: number;
  };
}

export interface TravelSpotOutput {
  status: number;
  success: boolean;
  message: string;
  data: {
    content: {
      spotId: number; //관광지 번호
      spotName: string | null; //"관광지 이름",
      spotAddress: string | null; //"관광지 주소"
      spotDescription: string | null; //"이러이러한 관관광지이다",
      url: string; //관광지 사진 url
      isWished: boolean;
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
    number: number;
    sort: {
      empty: true;
      unsorted: true;
      sorted: false;
    };
    size: number;
    first: true;
    numberOfElements: number;
    empty: false;
  };
}
