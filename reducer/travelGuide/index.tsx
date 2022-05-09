import produce from "immer";

export interface SearchOptions {
  location: string | null;
  category: string | null;
  userWeight: {
    viewWeight: number | null;
    priceWeight: number | null;
    facilityWeight: number | null;
    surroundWeight: number | null;
  };
}

interface State {
  isWeightOpened: boolean;
  isWishOpened: boolean;
  locationId: number;
  categoryId: number;
  searchOptions: SearchOptions;
}

interface Action {
  type: string;
  payload?: any;
}

export const initialState: State = {
  isWeightOpened: false,
  isWishOpened: false,
  locationId: 3,
  categoryId: 7,
  searchOptions: {
    location: "전체",
    category: "전체",
    userWeight: {
      viewWeight: null,
      priceWeight: null,
      facilityWeight: null,
      surroundWeight: null,
    },
  },
};

export const CHANGE_OPTION = "CHANGE_OPTION";
export const TOGGLE_WEIGHT_MODAL = "TOGGLE_WEIGHT_MODAL";
export const TOGGLE_WISH_MODAL = "TOGGLE_WISH_MODAL";
export const CLOSE_WEIGHT_MODAL = "CLOSE_WEIGHT_MODAL";
export const CLOSE_WISH_MODAL = "CLOSE_WISH_MODAL";

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
        draft.isWishOpened = !draft.isWishOpened;
      });
    }
    case CLOSE_WEIGHT_MODAL: {
      return produce(state, (draft) => {
        draft.isWeightOpened = false;
      });
    }
    case CLOSE_WISH_MODAL: {
      return produce(state, (draft) => {
        draft.isWishOpened = false;
      });
    }
  }
};
