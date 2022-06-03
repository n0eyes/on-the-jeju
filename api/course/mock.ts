import { WishListInfoOutput } from "./index";
export const mock = {
  getWishListInfo(favoriteId: number) {
    const response: WishListInfoOutput = {
      status: 200,
      success: true,
      message: "success",
      spotListDtoList: [
        {
          spotId: 5,
          spotName: "성산 어디 일출봉",
          spotAddress: "제주 서귀포시 성산읍 성산리 1",
          spotDescription: "해가 잘보여요",
          url: "url",
        },
        {
          spotId: 25,
          spotName: "아쿠아플라넷",
          spotAddress: "제주 서귀포시 성산읍 섭지코지로 95 아쿠아플라넷 제주",
          spotDescription: "아쿠아!",
          url: "url",
        },
        {
          spotId: 5,
          spotName: "제주 허브 동산",
          spotAddress: "제주 서귀포시 표선면 돈오름로 170",
          spotDescription: "허브 굿",
          url: "url",
        },
      ],
    };

    return response;
  },
};
