import { DestinationOutput, ReviewDto } from "./index";
export const mock = {
  getTravelSpot(id: number) {
    const response: DestinationOutput = {
      status: 200,
      success: true,
      message: "성공",
      data: {
        spotDto: {
          id: 7,
          name: "관광지 A",
          address: "제주도 어딘가",
          description:
            "관광지 정보 예시) 부서진 산호로 이루어진 백사장 등 빼어난 경관을 자랑하는 우도 8경이 유명하며, 인골분 이야기를 비롯한 몇 가지 설화와 잠수소리·해녀가 등의 민요가 전해진다. 남서쪽의 동천진동 포구에는 일제강점기인 1932년 일본인 상인들의 착취에 대항한 우도 해녀들의 항일항쟁을 기념하여 세운 해녀노래비가 있으며, 남동쪽 끝의 쇠머리오름에는 우도 등대가 있다. 성산포에서 1시간 간격으로 정기여객선이 운항된다.",
        },
        scoreDto: {
          id: 3,
          viewScore: 11.2, //뷰 점수
          priceScore: 14.2, //가격 점수
          facilityScore: 13.3, //시설 점수
          surroundScore: 12.3, //주변 점수

          viewRank: 43.2, //뷰 순위
          priceRank: 12.2, //가격 순위
          facilityRank: 1.1, //시설 순위
          surroundRank: 14.2, //주변 순위
        },
        pictureDto: [
          {
            id: 4,
            url: "/assets/daegu.webp",
          },
          {
            id: 5,
            url: "/assets/daejeon.webp",
          },
          {
            id: 6,
            url: "/assets/incheon.webp",
          },
          {
            id: 7,
            url: "/assets/seoul.webp",
          },
          {
            id: 8,
            url: "/assets/daegu.webp",
          },
        ],
        reviewDto: {
          content: [
            {
              id: 9,
              content: "review1",
            },
            {
              id: 16,
              content: "review2",
            },
            {
              id: 146,
              content: "review3",
            },
            {
              id: 136,
              content: "review4",
            },
            {
              id: 126,
              content: "review5",
            },
            {
              id: 216,
              content: "review6",
            },
          ],
          pageable: {
            sort: {
              empty: true,
              unsorted: true,
              sorted: false,
            },
            offset: 0,
            pageNumber: 0,
            pageSize: 10,
            paged: true,
            unpaged: false,
          },
          last: false,
          totalPages: 10,
          totalElements: 100,
          sort: {
            empty: true,
            unsorted: true,
            sorted: false,
          },
          first: true,
          number: 0,
          size: 10,
          numberOfElements: 10,
          empty: false,
        },
      },
      userScore: 0.2,
    };
    return response;
  },
  getNextReviews(index: number, size: number): ReviewDto {
    return {
      content: [
        {
          id: 19,
          content: "review11",
        },
        {
          id: 126,
          content: "review21",
        },
        {
          id: 1346,
          content: "review31",
        },
        {
          id: 1316,
          content: "review41",
        },
        {
          id: 1526,
          content: "review51",
        },
        {
          id: 2166,
          content: "review61",
        },
      ],
      pageable: {
        sort: {
          empty: true,
          unsorted: true,
          sorted: false,
        },
        offset: 0,
        pageNumber: 2,
        pageSize: 10,
        paged: true,
        unpaged: false,
      },
      last: false,
      totalPages: 10,
      totalElements: 100,
      sort: {
        empty: true,
        unsorted: true,
        sorted: false,
      },
      first: true,
      number: 0,
      size: 10,
      numberOfElements: 10,
      empty: false,
    };
  },
  getMeta() {
    return [
      {
        id: 1,
        name: "view",
      },
      {
        id: 2,
        name: "price",
      },
      {
        id: 3,
        name: "facility",
      },
      {
        id: 4,
        name: "surround",
      },
    ];
  },
};
