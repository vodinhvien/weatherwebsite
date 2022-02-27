import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Map } from 'pigeon-maps';

import { hideMap, showLoader, hideLoader, getForecastData } from '../../store/actions';

import Loader from '../Loader';
import styles from './index.module.css';
import closeImg from '../../assets/close.svg';

const MAP_ID = process.env.REACT_APP_MAP_ID;
const MAPTILER_ACCESS_TOKEN = process.env.REACT_APP_MAPTILER_ACCESS_TOKEN;

const mapTilerProvider = (x, y, z, dpr) => {
  return `https://api.maptiler.com/maps/${MAP_ID}/256/${z}/${x}/${y}${dpr >= 2 ? '@2x' : ''}.png?key=${MAPTILER_ACCESS_TOKEN}`;
};

export default ({ show }) => {
  const dispatch = useDispatch();

  const [loader, setLoader] = useState();

  const { unit, themes } = useSelector(state => state.mainState);

  const handleClick = async ({ latLng }) => {
    setLoader(true);
    await dispatch(getForecastData({ unit, lat: latLng[0], lon: latLng[1] }));
    dispatch(hideMap());
  };

  const handleHide = () => dispatch(hideMap());
  return (
    <div id='modal' className={`${styles.modal} ${show ? styles.show : ''} ${themes[0] ? styles.night : ''}`}>
      <img src={closeImg} className={styles.modalClose} onClick={handleHide} />
      {loader ? (
        <Loader />
      ) : (
        <Map
          defaultZoom={3}
          minZoom={3}
          defaultCenter={[32.22111, 35.25444]}
          provider={mapTilerProvider}
          dprs={[1, 2]}
          onClick={handleClick}
        ></Map>
      )}
    </div>
  );
};
