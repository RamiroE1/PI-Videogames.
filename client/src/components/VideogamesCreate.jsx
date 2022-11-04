import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from  "react-redux";
import { getGenres, postVideogames } from "../actions/index";

export default function VideogamesCreate(){
    const dispatch= useDispatch();
    const gen = useSelector((state) => state.gen)

    const [input, setInput] = useState({
        name: "",
        description: "",
        released: "",
        rating: 0,
        platforms: [],
        genres: [],
        image_background: "",
    })

    useEffect(() => {
        dispatch(getGenres());
    }, []);

    return(
        <div>
            <Link to= '/home'><button>Volver</button></Link>
            <h1>Crea tu Videogames!</h1>
            <form>
                <div>
                    <label>Name:</label>
                    <input
                    type= "text"
                    value= {input.name}
                    name= "name"
                    />
                </div>
                <div>
                    <label>Released:</label>
                    <input
                    type= "text"
                    value= {input.released}
                    name= "released"
                    />
                </div>
                <div>
                    <label>Rating:</label>
                    <input
                    type= "text"
                    value= {input.rating}
                    name= "rating"
                    />
                </div>
                <div>
                    <label>Platforms:</label>
                    <input
                    type= "text"
                    value= {input.platforms}
                    name= "platforms"
                    />
                </div>
                <div>
                    <label>Image:</label>
                    <input
                    type= "text"
                    value= {input.image_background}
                    name= "image"
                    />
                </div>
                <div>
                    <label>Descrption:</label>
                    <input
                    type= "text"
                    value= {input.description}
                    name= "description"
                    />
                </div>
                <div>
                    <label>Genres:</label>
                    <select >
                        <option value=""hidden>
                            Required
                        </option>
                        {gen.map(es => {
                            return (
                                <option key={es.id} value={es.id}>
                                    {es.name}
                                </option>
                            );
                        })}
                    </select>
                    
                </div>


            </form>
        </div>
    )
}