import produce from "immer";

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
  isWishOpened: {
    id: number | null;
    opened: boolean;
  };
  isWeightOpened: boolean;
  locationId: number;
  categoryId: number;
  searchOptions: SearchOptions;
}

interface Action {
  type: string;
  payload?: any;
}

export const initialState: State = {
  isWishOpened: {
    id: null,
    opened: false,
  },
  isWeightOpened: false,
  locationId: 5,
  categoryId: 7,
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
};

export const CHANGE_OPTION = "CHANGE_OPTION";
export const TOGGLE_WEIGHT_MODAL = "TOGGLE_WEIGHT_MODAL";
export const TOGGLE_WISH_MODAL = "TOGGLE_WISH_MODAL";
export const CLOSE_WEIGHT_MODAL = "CLOSE_WEIGHT_MODAL";
export const CLOSE_WISH_MODAL = "CLOSE_WISH_MODAL";
export const INCREASE_USER_WEIGHT = "INCREASE_USER_WEIGHT";
export const DECREASE_USER_WEIGHT = "DECREASE_USER_WEIGHT";

export const TravelReducer = (state: State, action: Action) => {
  switch (action.type) {
    case CHANGE_OPTION: {
      return produce(state, (draft) => {
        const {
          id,
          method,
          option,
        }: { id: number; method: "location" | "category"; option: string } =
          action.payload;
        draft.searchOptions[method] = option;
        draft[`${method}Id`] = id;
      });
    }
    case TOGGLE_WEIGHT_MODAL: {
      return produce(state, (draft) => {
        draft.isWeightOpened = true;
      });
    }
    case TOGGLE_WISH_MODAL: {
      return produce(state, (draft) => {
        draft.isWishOpened = { id: action.payload.spotId, opened: true };
      });
    }
    case CLOSE_WEIGHT_MODAL: {
      return produce(state, (draft) => {
        draft.isWeightOpened = false;
      });
    }
    case CLOSE_WISH_MODAL: {
      return produce(state, (draft) => {
        draft.isWishOpened = { id: null, opened: false };
      });
    }
    case INCREASE_USER_WEIGHT: {
      return produce(state, (draft) => {
        const keys = Object.keys(draft.searchOptions.userWeight);

        if (draft.searchOptions.userWeight[keys[action.payload]] < 5)
          draft.searchOptions.userWeight[keys[action.payload]] += 1;
      });
    }
    case DECREASE_USER_WEIGHT: {
      return produce(state, (draft) => {
        const keys = Object.keys(draft.searchOptions.userWeight);

        if (draft.searchOptions.userWeight[keys[action.payload]] > 0)
          draft.searchOptions.userWeight[keys[action.payload]] -= 1;
      });
    }
  }
};
