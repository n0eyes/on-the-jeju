import { TravelSpotInput, TravelSpotOutput } from "./index";
export const mock = {
  getTravelSpot(searchOptions: TravelSpotInput) {
    const response: TravelSpotOutput = {
      status: 200,
      success: true,
      message: "성공",
      data: {
        content: [
          {
            spotId: 8,
            spotName: "장소 A",
            spotAddress: null,
            spotDescription: "장소 A 설명....",
            url: "/assets/seoul.webp",
          },
          {
            spotId: 72,
            spotName: "장소 B",
            spotAddress: null,
            spotDescription: "장소 B 설명....",
            url: "/assets/seoul.webp",
          },
          {
            spotId: 32,
            spotName: "장소 C",
            spotAddress: null,
            spotDescription: "장소 C 설명....",
            url: "/assets/seoul.webp",
          },
          {
            spotId: 12,
            spotName: "장소 D",
            spotAddress: null,
            spotDescription: "장소 D 설명....",
            url: "/assets/seoul.webp",
          },
          {
            spotId: 77,
            spotName: "장소 E",
            spotAddress: null,
            spotDescription: "장소 E 설명....",
            url: "/assets/seoul.webp",
          },
          {
            spotId: 99,
            spotName: "장소 F",
            spotAddress: null,
            spotDescription: "장소 F 설명....",
            url: "/assets/seoul.webp",
          },
          {
            spotId: 36,
            spotName: "장소 G",
            spotAddress: null,
            spotDescription: "장소 G 설명....",
            url: "/assets/seoul.webp",
          },
          {
            spotId: 97,
            spotName: "장소 H",
            spotAddress: null,
            spotDescription: "장소 H 설명....",
            url: "/assets/seoul.webp",
          },
          {
            spotId: 101,
            spotName: "장소 I",
            spotAddress: null,
            spotDescription: "장소 I 설명....",
            url: "/assets/seoul.webp",
          },
        ],
        pageable: {
          sort: {
            empty: true,
            sorted: false,
            unsorted: true,
          },
          offset: 0,
          pageNumber: 0,
          pageSize: 20,
          paged: true,
          unpaged: false,
        },
        last: false,
        totalPages: 5,
        totalElements: 100,
        sort: {
          empty: true,
          sorted: false,
          unsorted: true,
        },
        first: true,
        number: 0,
        size: 20,
        numberOfElements: 20,
        empty: false,
      },
    };
    return {
      mutate(searchOptions: TravelSpotInput): TravelSpotOutput {
        return response;
      },
    };
  },
};
