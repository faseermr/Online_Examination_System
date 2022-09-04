import {rootReducer} from '../reducer/index';
import { createStore,applyMiddleware,compose} from "redux";
import thunk from 'redux-thunk'
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {};

const middleware = [thunk];
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

//const store = createStore(rootReducer,applyMiddleware(thunk))
/*const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(logger, ...middleware),
      //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );*/
export default store