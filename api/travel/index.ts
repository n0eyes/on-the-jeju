export interface TravelSpotInput {
  location: string | null;
  category: string | null;
  userWeight: {
    viewWeight: number | null;
    priceWeight: number | null;
    facilityWeight: number | null;
    surroundWeight: number | null;
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
