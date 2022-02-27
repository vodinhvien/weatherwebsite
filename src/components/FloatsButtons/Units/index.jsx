import React, { useContext } from 'react';

import { ShowBubleContext } from '../../../context/ShowBubleContext';

import styles from './index.module.css';
import gStyels from '../index.module.css';
import cogIcon from '../../../assets/cog-solid.svg';

export default ({ handleUnits, handleOnlyOneLocation, unit, onlyOneLocation, themes }) => {
  const { updateShowBuble, showId } = useContext(ShowBubleContext);
  return (
    <div id='units_bubble' className={`${gStyels.cyrcle} ${themes[0] ? gStyels.night : ''}`} onClick={updateShowBuble}>
      <img id='units_bubble' src={cogIcon} className={gStyels.floatbuttonsImage} onClick={updateShowBuble} />
      <div
        id='units_bubble'
        className={`${gStyels.bubble} ${themes[0] ? gStyels.night : ''} ${showId === 'units_bubble' ? gStyels.showBubble : ''}  ${
          gStyels.thirdBuble
        }`}
      >
        <p id='units_bubble' className={styles.radioItem}>
          Units:
        </p>
        <p id='units_bubble' className={styles.radioItem}>
          <input
            className={styles.radioButton}
            type='radio'
            id='units_bubble'
            name='radio-group'
            checked={unit === 'metric' ? true : false}
          />
          <label id='units_bubble' onClick={() => handleUnits('metric')}>
            Metric
          </label>
        </p>
        <p id='units_bubble' className={styles.radioItem}>
          <input
            className={styles.radioButton}
            type='radio'
            id='units_bubble'
            checked={unit === 'imperial' ? true : false}
            name='radio-group'
          />
          <label id='units_bubble' onClick={() => handleUnits('imperial')}>
            Imperial
          </label>
        </p>
        <hr />
        <p id='units_bubble' className={styles.radioItem}>
          <input id='units_bubble' className={styles.checkButton} type='checkbox' checked={!!onlyOneLocation} name='radio-group' />
          <label id='units_bubble' onClick={handleOnlyOneLocation}>
            Only One Location?
          </label>
        </p>
      </div>
    </div>
  );
};
