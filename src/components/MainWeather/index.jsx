import React from 'react';
import { useSelector } from 'react-redux';
import windIcon from '../../assets/icons/wind.png';

import Image from '../Image';

import styles from './index.module.css';
export default () => {
  const { weathers, unit, themes } = useSelector(state => state.mainState);

  const deg = unit === 'metric' ? <span>&#8451;</span> : <span>&#8457;</span>;
  const data = weathers[0];
  return (
    <div className={styles.container}>
      {data?.map((item, i) =>
        i === 0 ? (
          <div className={styles.section} key={i}>
            <div className={`${styles.cardBG} ${themes[0] ? styles.night : ''}`}>
              <div className={styles.cardBGHeader}>{item.city || 'Unknown Place'}</div>
              <div className={styles.cardBGBody}>
                <div className={styles.cardBGFirst}>
                  <div className={styles.cardBGRight}>
                    <p>{item.day.toUpperCase()}</p>
                    <div className={styles.tempContainer}>
                      <p>
                        {item.dayTemp}
                        {deg}
                      </p>
                      <p>
                        {item.nightTemp}
                        {deg}
                      </p>
                    </div>
                  </div>
                  <div className={styles.cardBGRight}>
                    <Image value={item.icon} height='100px' />
                  </div>
                </div>
                <div className={styles.cardBGSecond}>
                  <div className={styles.windSpeed}>
                    <p>{item.speed}</p> &nbsp;
                    <img src={windIcon} />
                  </div>
                  <h3>{item.date}</h3>
                </div>
              </div>
            </div>
          </div>
        ) : i % 2 !== 0 ? (
          <div className={styles.section} key={i}>
            <div className={`${styles.cardSM} ${themes[0] ? styles.night : ''}`}>
              <h1>{item.day.toUpperCase()}</h1>
              <div className={styles.tempContainer}>
                <h2>
                  {item.dayTemp}
                  {deg}
                </h2>
                <h3>
                  {item.nightTemp}
                  {deg}
                </h3>
              </div>
              <Image value={item.icon} height='40px' />
            </div>
            <div className={`${styles.cardSM} ${themes[0] ? styles.night : ''}`}>
              <h1>{data[i + 1].day.toUpperCase()}</h1>
              <div className={styles.tempContainer}>
                <h2>
                  {data[i + 1].dayTemp}
                  {deg}
                </h2>
                <h3>
                  {data[i + 1].nightTemp}
                  {deg}
                </h3>
              </div>
              <Image value={item.icon} height='40px' />
            </div>
          </div>
        ) : null
      )}
    </div>
  );
};
