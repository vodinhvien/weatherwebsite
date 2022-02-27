import { combineReducers } from 'redux';

import mainState from './_main';
import utilsState from './_utils';

export default combineReducers({ mainState, utilsState });
