import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames, getGenres, filterByCreated, filterByGenres, sort } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import Game from "../Img/Game.jpg";



export default function Home (){

    const dispatch = useDispatch();
    const allVideogames = useSelector((state) => state.videogames);
    const allGenres = useSelector((state) => state.genres);
    const [orden, setOrden] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [videogamesPerPage, setVideogamesPerPage] = useState(15);
    const indexOfLastVideogames = currentPage * videogamesPerPage;
    const indexOfFirstVideogames = indexOfLastVideogames - videogamesPerPage;
    const currentVideogames = allVideogames.slice(indexOfFirstVideogames, indexOfLastVideogames);


    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect (() => {
        dispatch(getVideogames());
        dispatch(getGenres());
    },[dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getVideogames());
    }

    function handleFilterCreated(e){
        e.preventDefault();
        dispatch(filterByCreated(e.target.value));
        setCurrentPage(1);
    }

    function handleFilterGenres(e){
        e.preventDefault();
        dispatch(filterByGenres(e.target.value));
        setCurrentPage(1);
    }

    function handleSort(e){
        e.preventDefault();
        dispatch(sort(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    };

    return (
        <div>
        <Link to= '/videogames'>Crear Videogames</Link>
        <h1>VIDEOGAMES</h1>
        <button onClick={e=>{handleClick(e)}}>
            Volver a cargar todos los Videogames
        </button>
        <div>
        <select onChange={e => handleFilterGenres(e)}>
                    <option >Filtro por Genero</option>
                    {
                        allGenres.length &&
                        allGenres.map(genres => {
                            <option key={genres.id} value={genres.name}>{genres.name}</option>
                    })}

        </select>

        <select onChange={e => handleFilterCreated(e)}>
            <option value="db"> Videogames Creados </option>
            <option value="api"> Existentes </option>
            <option value="All"> Todos </option>
        </select>

        <select onChange={e => handleSort(e)}>
            <option value="" > Clasificar </option>
            <option value="alphAsc"> A-Z </option>
            <option value="alphDesc"> Z-A </option>
            <option value="ratingAsc"> Rating -asc- </option>
            <option value="ratingDesc"> Rating -desc- </option>
        </select>
        <SearchBar/>
        <Paginado
        videogamesPerPage= {videogamesPerPage}
        allVideogames= {allVideogames.length}
        currentPage= {currentPage}
        paginado = {paginado}
        />
    {
        currentVideogames?.map(el => {
            return(
                <div key={el.id}>
                <Link to={"/home/" + el.id}>
                <Card name={el.name} image_background={el.image_background? el.image_background : Game} genres={el.genres} key={el.id}/>        
                </Link>
                </div>
            );
        })
    }
    </div>
    </div>

)
};