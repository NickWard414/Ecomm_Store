import { createStore, applyMiddelware } from 'redux';
import Logger from 'redux-logger';

import rootReducer from './root-reducer'


const middlewares = [logger];

const store = createStore(rootReducer, applyMiddelware(...middlewares));

export default store;
