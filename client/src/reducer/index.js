import { GET_VIDEOGAMES, GET_GENRES, GET_NAME_VIDEOGAMES, POST_VIDEOGAMES, FILTER_BY_CREATED, FILTER_BY_GENRES, SORT } from "../actions/action-types";


const initialState = {
    allVideogames : [],
    videogames : [],
    genres : [],
};

function rootReducer (state = initialState, action){
    switch(action.type) {
        case GET_VIDEOGAMES:
            return{
                ...state,
                allVideogames: action.payload,
                videogames: action.payload
            }
        case GET_GENRES:
            return{
                ...state,
                genres: action.payload
            }
        case GET_NAME_VIDEOGAMES:
            return{
                ...state,
                videogames: action.payload
            }



        case POST_VIDEOGAMES:
            return{
                ...state,
            }
        


        case FILTER_BY_CREATED:
                const allVideogames= state.allVideogames;
                let filteredVideogames= allVideogames;
                if (action.payload === "db")
                    filteredVideogames= allVideogames.filter(game => typeof game.id === "string");
                if (action.payload === "api")
                    filteredVideogames= allVideogames.filter(game => typeof game.id === "number");
                return {
                    ...state,
                    videogames: filteredVideogames.length ? filteredVideogames : "Not found",
                }

        case FILTER_BY_GENRES:
                const videogames= state.allVideogames; //const de lo que quiero filtrar
                const filterVideogamesGen= action.payload === 'genres' ? videogames : videogames.filter( e => {
                    let generos='';
                    for (let i=0; i<e.genres.length; i++) {
                        if(e.genres[i] === action.payload.toLowerCase()) {
                            generos=e.genres[i]
                        }
                    }
                    return generos
                })
                return {
                    ...state,
                    videogames:filterVideogamesGen,
                }

        case SORT:
            let sortedVideogames;
            if (typeof state.videogames !== "string") {
                sortedVideogames =
                    action.payload === "alphAsc"
                        ? state.videogames.sort((a, b) => {
                                    if (a.name > b.name) return 1;
                                    if (a.name < b.name) return -1;
                                    return 0;
                        })
                        : action.payload === "alphDesc"
                        ? state.videogames.sort((a, b) => {
                                    if (a.name > b.name) return -1;
                                    if (a.name < b.name) return 1;
                                    return 0;
                        })
                        : action.payload === "ratingAsc"
                        ? state.videogames.sort(
                                    (a, b) => a.rating.split(" - ")[0] - b.rating.split(" - ")[0]
                        )
                        : state.videogames.sort(
                                    (a, b) => b.rating.split(" - ")[0] - a.rating.split(" - ")[0]
                        );
            } else sortedVideogames = "Not found";
            return {
                ...state,
                videogames: sortedVideogames,
            }
            default:
                return state;
}
}


export default rootReducer;