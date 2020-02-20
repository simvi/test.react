import {Dispatch} from "redux";
//import {ThunkAction, ThunkDispatch} from "redux-thunk";


// Films Actions

export enum AllowedActions {
    TOGGLE_FAVORITE = 'TOGGLE_FAVORITE',
}

interface FilmAction {
    type: AllowedActions;
    value: any;
}

/*
export const toggleFavoriteAction = (film: any): FilmAction => {
    //const toggleFavoriteAction = {type: "TOGGLE_FAVORITE", value: this.state.film}
    return {
        type: AllowedActions.TOGGLE_FAVORITE,
        value: {
            ...film
        },
    };
};

export type FilmsActionTypes = FilmAction;

*/





// -- Action creator

export const toggleFavoriteAction = (film: any) => ({
    type: AllowedActions.TOGGLE_FAVORITE,
    value: {
        ...film
    },
});

// -- Thunks


export const toggleFavoriteThunk = (film) =>
    console.log('toggleFavorite thunk');

     async(dispatch: Dispatch) => {
        try {
            //const article = await fakeAPI('/articles/create', data);
            dispatch(toggleFavoriteAction(film));
            return film;
        } catch (error) {
            return Promise.reject(error);
        }

};


