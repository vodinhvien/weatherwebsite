import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import dotenv from 'dotenv';
import './index.css';
import App from './App';

import ShowBubleContext from './context/ShowBubleContext';

dotenv.config();

export const { store, persistor } = configureStore();

const render = Component => {
  return ReactDOM.render(
    <Provider store={store}>
      <ShowBubleContext>
        <Component />
      </ShowBubleContext>
    </Provider>,
    document.getElementById('root')
  );
};

render(App);
