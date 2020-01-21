// API/TMDBApi.js

const API_TOKEN = "4c1960df2c89884de765748fb925c222";

export function getFilmsFromApiWithSearchedText (text: string, page: number) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + '&page=' + page
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error))
}