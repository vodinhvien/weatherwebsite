import { mainActionsTypes } from '../actions_types';
import { updateUnitHelper, handleThemes } from '../../utils';

const initialState = {
  weathers: [],
  unit: 'metric',
  onlyOneLocation: true,
  themes: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case mainActionsTypes.ADD_NEW_WEATHER_ITEM:
      return state.onlyOneLocation
        ? { ...state, themes: handleThemes(payload), weathers: payload }
        : { ...state, themes: handleThemes(state.weathers.concat(payload)), weathers: state.weathers.concat(payload) };
    case mainActionsTypes.REMOVE_WEATHER_ITEM:
      let newWeathers = state.weathers;
      newWeathers.splice(payload, 1);
      return { ...state, themes: handleThemes(newWeathers), weathers: newWeathers };
    case mainActionsTypes.UPDATE_UNIT:
      let newArray = updateUnitHelper(state.weathers, payload);
      return { ...state, weathers: newArray, unit: payload };
    case mainActionsTypes.UPDATE_ONLY_ONE_LOCATION:
      return { ...state, onlyOneLocation: !state.onlyOneLocation };
    default:
      return state;
  }
};
