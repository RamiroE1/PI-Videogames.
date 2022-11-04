import React from "react";
import { Link } from "react-router-dom";
import s from "./Card.module.css";

export default function Card({ id, name, genres, image_background }) {

    return(
        <div className={s.container}>
            <div className={s.name}><h3>{name}</h3></div>
            <img className={s.img} src={image_background} alt="Not found" />
        <div className={s.genresContainer}>
            <span className={s.genresName}>Genres:</span>
            {genres ? (
                <span className={s.genresValue}>
                    {genres.map(e => {
                        return e.name + " ";
                    })}
                </span>
            ) : (
                <span className={s.genresValue}>Genres not found</span>
            )}
        </div>
        {/* <Link to={`/home/${id}`}>
            <button className={s.btn}>!</button>
        </Link> */}
    </div>
    );
}