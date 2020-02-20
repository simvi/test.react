// store/reducers/favoriteReducer

import {Action, Reducer, StateFromReducersMapObject} from "redux";

const initialState = { favoritesFilms: []}

function toggleFavorite(state = initialState, action:Action) {
    let nextState

    switch (action.type) {
        case 'TOGGLE_FAVORITE':
            const favoriteFilmIndex = state.favoritesFilms.findIndex( item =>
                item.id === action.value.id
            )

            if (favoriteFilmIndex !== -1) {
                // Suppression du film
                nextState = {
                    ...state,
                    favoritesFilms: state.favoritesFilms.filter( (item, index) => index !== favoriteFilmIndex )
                }

            }
            else {
                // Add film
                nextState = {...state, favoritesFilms: [...state.favoritesFilms, action.value]}
            }

            return nextState || state
        default:
            return state
    }

}

export default toggleFavorite