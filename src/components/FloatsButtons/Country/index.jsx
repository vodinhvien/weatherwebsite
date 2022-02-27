import React, { useState, useContext } from 'react';

import { ShowBubleContext } from '../../../context/ShowBubleContext';

import { searchCountries, listCities } from 'cclist';
import styles from './index.module.css';
import gStyels from '../index.module.css';
import cityIcon from '../../../assets/city-solid.svg';

export default ({ themes, handleNewPlace }) => {
  const [state, setState] = useState({});
  const { updateShowBuble, showId } = useContext(ShowBubleContext);
  //
  const handleCountryChange = e => {
    let countires = searchCountries(e.target.value, 'code name');
    let countryList = countires.splice(0, 4);
    setState({ ...state, countryList, showCities: false, countryName: e.target.value, showCountry: countryList.length ? true : false });
  };

  const handleCountryClick = e => {
    let allCities = listCities(e.code);
    setState({
      ...state,
      showCountry: false,
      allCities,
      citiesList: allCities,
      countryName: e.name,
      countryCode: e.code,
      showCities: allCities.length ? true : false
    });
  };

  const handleCityChange = e => {
    let citiesList = [];
    state.allCities.map(item => {
      let t = new RegExp(`${e.target.value.toLowerCase()}`).test(item.toLowerCase());
      if (t) citiesList.push(item);
    });
    setState({ ...state, citiesList, cityName: e.target.value });
  };

  const handleCityClick = e => {
    setState({ ...state, cityName: e, citiesList: [] });
    handleNewPlace(`${e},${state.countryCode}`);
  };
  return (
    <div id='country_bubble' className={`${gStyels.cyrcle} ${themes[0] ? gStyels.night : ''}`}>
      <img src={cityIcon} className={gStyels.floatbuttonsImage} id='country_bubble' onClick={updateShowBuble} />
      <div
        className={`${gStyels.bubble} ${themes[0] ? gStyels.night : ''} ${showId === 'country_bubble' ? gStyels.showBubble : ''}  ${
          gStyels.firstBuble
        }`}
      >
        <div className={styles.autocomplete}>
          <input
            type='text'
            value={state?.countryName || ''}
            id='country_bubble'
            placeholder='Enter Country'
            onChange={handleCountryChange}
          />
          {state?.countryList?.length && state.showCountry ? (
            <div className={styles.list} id='country_bubble'>
              {state.countryList.map(item => (
                <div id='country_bubble' className={styles.list_item} key={item.code} onClick={() => handleCountryClick(item)}>
                  {item.name}
                </div>
              ))}
            </div>
          ) : null}
        </div>

        {/* Cities */}
        {state.showCities ? (
          <div className={styles.autocomplete}>
            <input type='text' id='country_bubble' value={state?.cityName || ''} placeholder='Choose City' onChange={handleCityChange} />
            {state?.citiesList?.length && state.showCities ? (
              <div id='country_bubble' className={styles.list}>
                {state.citiesList.map((item, i) => (
                  <div className={styles.list_item} key={i} onClick={() => handleCityClick(item)}>
                    {item}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};
