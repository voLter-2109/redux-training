import { combineReducers, legacy_createStore as createStore } from "redux";

import homeReducer from "./homeReducer";
import pageTwoReducer from "./pageTwoReducer";

let reducer = combineReducers({
  home: homeReducer,
  pageTwo: pageTwoReducer,
});

let store = createStore(reducer);

window.store = store;

export default store;
