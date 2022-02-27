import Axios from 'axios';
import { mainActionsTypes, utilsActionsTypes } from '../actions_types';
import { formateWeatherData } from '../../utils';

/* ----------------------get user curent location---------------------------- */
export const getDefaltLocation = async () => {
  try {
    const fetchData = async () => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    };
    if (navigator.geolocation) {
      let result = await fetchData();
      return result.coords ? { lat: result.coords.latitude, lon: result.coords.longitude } : { lat: 51.477928, lon: -0.001545 };
    } else {
      // * return greenwich lat and lon if any thing went wrong
      return { lat: 51.477928, lon: -0.001545 };
    }
  } catch (err) {
    return { lat: 51.477928, lon: -0.001545 };
  }
};

export const getForecastData = ({ unit, lon, lat, name }) => async dispatch => {
  let weatherData = await Axios.get(
    `${process.env.REACT_APP_WEATHER_MAIN_URL}/daily?${!name ? 'lat=' + lat + '&lon=' + lon : 'q=' + name}&cnt=7&units=${
      unit ? unit : 'metric'
    }`,
    {
      headers: {
        'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY
      }
    }
  );
  lat = lat ? lat : weatherData.data.city.coord.lat;
  lon = lon ? lon : weatherData.data.city.coord.lon;

  let timeData = await Axios.get(`${process.env.REACT_APP_RAPIDAPI_TIME_URL}?location=${lat}, ${lon}`, {
    headers: {
      'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY
    }
  });
  let formatedData = await formateWeatherData({ ...weatherData.data, time: timeData.data.data.time_now });
  return dispatch({ type: mainActionsTypes.ADD_NEW_WEATHER_ITEM, payload: [formatedData] });
};

/* -------------------------remove weather column---------------------------- */
export const removeWeatherCol = index => dispatch => dispatch({ type: mainActionsTypes.REMOVE_WEATHER_ITEM, payload: index });

/* ---------------------------show and hide map------------------------------ */
export const showMap = () => dispatch => dispatch({ type: utilsActionsTypes.SHOW_MAP });

export const hideMap = () => dispatch => dispatch({ type: utilsActionsTypes.HIDE_MAP });

/* ----------------------------show and hide loader-------------------------- */
export const showLoader = () => dispatch => dispatch({ type: utilsActionsTypes.SHOW_LOADER });

export const hideLoader = () => dispatch => dispatch({ type: utilsActionsTypes.HIDE_LOADER });

/* ------------------------------update unit--------------------------------- */
export const updateUnit = unit => dispatch => dispatch({ type: mainActionsTypes.UPDATE_UNIT, payload: unit });

export const updateOnlyOneLocation = () => dispatch => dispatch({ type: mainActionsTypes.UPDATE_ONLY_ONE_LOCATION });
