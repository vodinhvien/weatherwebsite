import { utilsActionsTypes } from '../actions_types';

const initialState = {
  isMapShown: false,
  isLoading: false,
  citiesList: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case utilsActionsTypes.SHOW_MAP:
      return { ...state, isMapShown: true };
    case utilsActionsTypes.HIDE_MAP:
      return { ...state, isMapShown: false };
    case utilsActionsTypes.SHOW_LOADER:
      return { ...state, isLoading: true };
    case utilsActionsTypes.HIDE_LOADER:
      return { ...state, isLoading: false };
    case utilsActionsTypes.FILL_CITIES_LIST:
      return { ...state, citiesList: payload };
    default:
      return state;
  }
};
