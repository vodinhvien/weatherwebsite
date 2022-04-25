import Axios from 'axios';
import { mainActionsTypes, utilsActionsTypes } from '../actions_types';
import { formateWeatherData } from '../../utils';

/* ----------------------get user curent location---------------------------- */
export const getDefaltLocation = async() => {
    try {
        const fetchData = async() => {
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
        };
        if (navigator.geolocation) {
            let result = await fetchData();
            return result.coords ? { lat: result.coords.latitude, lon: result.coords.longitude } : { lat: 10.762622, lon: 106.660172 };
        } else {
            // * return ho chi minh city lat and lon if any thing went wrong
            return { lat: 10.762622, lon: 106.660172 };
        }
    } catch (err) {
        return { lat: 10.762622, lon: 106.660172 };
    }
};

export const getForecastData =
    ({ unit, lon, lat, name }) =>
    async dispatch => {
        let weatherData = await Axios.get(
            `https://community-open-weather-map.p.rapidapi.com/forecast/daily?${!name ? 'lat=' + lat + '&lon=' + lon : 'q=' + name}&cnt=7&units=${
        unit ? unit : 'metric'
      }`, {
                headers: {
                    'x-rapidapi-key': '00c0fc999cmshba5b634c0e546e3p19852bjsn720a4eb70897'
                }
            }
        );
        lat = lat ? lat : weatherData.data.city.coord.lat;
        lon = lon ? lon : weatherData.data.city.coord.lon;

        let timeData = await Axios.get(`https://geo-services-by-mvpc-com.p.rapidapi.com/timezone?location=${lat}, ${lon}`, {
            headers: {
                'x-rapidapi-key': '00c0fc999cmshba5b634c0e546e3p19852bjsn720a4eb70897'
            }
        });
        let formatedData = await formateWeatherData({...weatherData.data, time: timeData.data.data.time_now });
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