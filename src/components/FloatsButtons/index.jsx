import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { showLoader, hideLoader } from '../../store/actions';
import { showMap, updateUnit, getForecastData, updateOnlyOneLocation } from '../../store/actions';

import Units from './Units';
import Countries from './Country';
import mapIcon from '../../assets/map-marked-solid.svg';

import styles from './index.module.css';
export default () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({});
  const { unit, onlyOneLocation, themes } = useSelector(state => state.mainState);

  const handleUnits = e => {
    if (e !== unit) dispatch(updateUnit(e));
  };

  const handleClick = index => {
    setState({ ...state, show: index });
    if (index === 2) dispatch(showMap());
  };

  const handleOnlyOneLocation = e => {
    dispatch(updateOnlyOneLocation());
  };
  const handleNewPlace = async data => {
    dispatch(showLoader());
    await dispatch(getForecastData({ unit, name: data }));
    dispatch(hideLoader());
  };

  return (
    <div className={styles.floatbuttons}>
      <Countries themes={themes} handleNewPlace={handleNewPlace} />

      <div className={`${styles.cyrcle} ${themes[0] ? styles.night : ''}`} onClick={() => handleClick(2)}>
        <img src={mapIcon} className={styles.floatbuttonsImage} onClick={() => handleClick(2)} />
      </div>

      <Units
        handleUnits={handleUnits}
        handleOnlyOneLocation={handleOnlyOneLocation}
        unit={unit}
        onlyOneLocation={onlyOneLocation}
        themes={themes}
      />
    </div>
  );
};
