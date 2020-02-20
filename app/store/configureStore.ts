//store/configureStore.ts

import {applyMiddleware, combineReducers, createStore} from "redux";
import toggleFavorite from "./reducers/favoriteReducer";
import thunk from "redux-thunk"

export default createStore(toggleFavorite)