import React from 'react';

import icon2 from '../../assets/icons/icon2.svg';
import icon3 from '../../assets/icons/icon3.svg';
import icon5 from '../../assets/icons/icon5.svg';
import icon6 from '../../assets/icons/icon6.svg';
import icon7 from '../../assets/icons/icon7.svg';
import icon8 from '../../assets/icons/icon8.svg';
import clear from '../../assets/icons/clear.svg';

export default ({ value, height }) => {
  const images = { icon2, icon3, icon5, icon6, icon7, icon8, clear };

  const ImageName = images[value];

  return <img src={ImageName} alt={value} style={{ height: `${height}` }} />;
};
