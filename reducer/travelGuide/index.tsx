import produce from "immer";
import { TravelSpotOutput } from "../../fetcher/travel";

export interface UserWeight {
  viewWeight: number;
  priceWeight: number;
  facilityWeight: number;
  surroundWeight: number;
  [index: string]: number;
}
export interface SearchOptions {
  location: string;
  category: string | null;
  userWeight: UserWeight;
}

interface State {
  searchKeyword: string;
  isWeightOpened: boolean;
  locationId: number;
  categoryId: number;
  searchOptions: SearchOptions;
  spotList: {
    spotId: number; //관광지 번호
    spotName: string | null; //"관광지 이름",
    spotAddress: string | null; //"관광지 주소"
    spotDescription: string | null; //"이러이러한 관관광지이다",
    url: string; //관광지 사진 url
  }[];
}

interface Action {
  type: string;
  payload?: any;
}

export const initialState: State = {
  searchKeyword: "",
  isWeightOpened: false,
  locationId: 6,
  categoryId: 1,
  searchOptions: {
    location: "전체",
    category: "전체",
    userWeight: {
      viewWeight: 0,
      priceWeight: 0,
      facilityWeight: 0,
      surroundWeight: 0,
    },
  },
  spotList: [],
};

export const INIT_DATA = "INIT_DATA";
export const UPDATE_DATA = "UPDATE_DATA";
export const CHANGE_OPTION = "CHANGE_OPTION";
export const UPDATE_KEYWORD = "UPDATE_KEYWORD";
export const CLEAR_KEYWORD = "CLEAR_KEYWORD";
export const CLEAR_WEIGHT = "CLEAR_WEIGHT";
export const TOGGLE_WEIGHT_MODAL = "TOGGLE_WEIGHT_MODAL";
export const CLOSE_WEIGHT_MODAL = "CLOSE_WEIGHT_MODAL";

export const TravelReducer = (state: State, action: Action) => {
  switch (action.type) {
    case INIT_DATA: {
      return {
        ...state,
        spotList: [...action.payload.data.content],
      };
    }

    case UPDATE_DATA: {
      return {
        ...state,
        spotList: [...state.spotList, ...action.payload.data.content],
      };
    }

    case CHANGE_OPTION: {
      return produce(state, (draft) => {
        const {
          id,
          method,
          option,
          data: { data },
        }: {
          id: number;
          method: "location" | "category";
          option: string;
          data: TravelSpotOutput;
        } = action.payload;
        draft.searchOptions[method] = option;
        draft[`${method}Id`] = id;
        draft.spotList = data.content;
      });
    }

    case TOGGLE_WEIGHT_MODAL: {
      return produce(state, (draft) => {
        draft.isWeightOpened = true;
      });
    }

    case CLOSE_WEIGHT_MODAL: {
      return produce(state, (draft) => {
        draft.isWeightOpened = false;
      });
    }

    case UPDATE_KEYWORD: {
      return produce(state, (draft) => {
        draft.searchKeyword = action.payload;
      });
    }

    case CLEAR_KEYWORD: {
      return produce(state, (draft) => {
        draft.searchKeyword = "";
      });
    }

    case CLEAR_WEIGHT: {
      return produce(state, (draft) => {
        const keys = Object.keys(draft.searchOptions.userWeight);
        keys.forEach((key) => (draft.searchOptions.userWeight[key] = 0));
      });
    }
  }
};
