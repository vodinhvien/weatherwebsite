import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getDefaltLocation, getForecastData } from './store/actions';
import { ShowBubleContext } from './context/ShowBubleContext';

import FloatButtons from './components/FloatsButtons';
import Loader from './components/Loader';
import Main from './components/MainWeather';
import MultiWeather from './components/MultiWeathers';
import Modal from './components/Modal';

const App = () => {
  const dispatch = useDispatch();
  const { updateShowBuble } = useContext(ShowBubleContext);
  const { weathers, unit, themes } = useSelector(state => state.mainState);
  const { isMapShown, isLoading } = useSelector(state => state.utilsState);

  useEffect(() => {
    const loadContent = async () => {
      let location = await getDefaltLocation();
      dispatch(getForecastData({ unit, ...location }));
    };
    if (!weathers.length) loadContent();
  }, [dispatch]);

  if (!weathers?.length) return <Loader />;
  return (
    <div className='App' id='off' onClick={updateShowBuble}>
      <FloatButtons />

      {weathers?.length === 1 && window.innerWidth > 425 ? <Main /> : <MultiWeather weathers={weathers} unit={unit} themes={themes} />}

      {isLoading ? <Loader /> : null}
      {isMapShown ? <Modal show={isMapShown} /> : null}
    </div>
  );
};

export default App;
