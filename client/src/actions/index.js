import axios from 'axios';
import { GET_VIDEOGAMES, GET_GENRES, GET_NAME_VIDEOGAMES, FILTER_BY_CREATED, FILTER_BY_GENRES, SORT } from './action-types';

export function getVideogames(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/videogames");

        return dispatch({
            type: GET_VIDEOGAMES,
            payload: json.data
        })
    };
}

export function getGenres(){
    return async function (dispatch){
        var json = await axios.get("http://localhost:3001/genres");

        return dispatch({
            type: GET_GENRES,
            payload: json.data
        })
    };
}

export function getNameVideogames(name){
    return async function (dispatch){
        try{
            var json = await axios.get("http://localhost:3001/videogames?name=${name}");
            return dispatch ({
                type : GET_NAME_VIDEOGAMES,
                payload : json.data
            })
        } catch (error){
            console.log(error)
        }
    }
}

export function postVideogames(payload){
    return async function(dispatch){
        const response = await axios.post("http://localhost:3001/videogames",payload);
        console.log(response)
        return response;
    }
}

export function filterByCreated(payload){
    return{
        type: FILTER_BY_CREATED,
        payload,
    };
}

export function filterByGenres(payload){
    return{
        type: FILTER_BY_GENRES,
        payload,
    };
}

export function sort(payload){
    return{
        type: SORT,
        payload,
    };
}