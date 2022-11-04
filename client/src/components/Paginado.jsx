import React from "react";
import s from "../components/Paginado.module.css";

export default function Paginado ({videogamesPerPage, currentPage, allVideogames, paginado}){
    const pageNumbers = []

    for (let i=1; i <= Math.ceil(allVideogames/videogamesPerPage); i++) {
        pageNumbers.push(i)
    }

    return(
        <div className={s.container}>
            <button
                className={s.btn}
                onClick={() =>
                    paginado(currentPage === 1 ? currentPage : currentPage - 1)
                }
            >
                « Prev
            </button>
            {pageNumbers &&
                pageNumbers.map(number => (
                    <button
                        className={s.btn}
                        key={number}
                        onClick={() => paginado(number)}
                    >
                        {currentPage === number ? <b className={s.btnCurrent}>{number}</b> : number}
                    </button>
                ))}
            <button
                className={s.btn}
                onClick={() =>
                    paginado(
                        currentPage === pageNumbers.length
                            ? pageNumbers.length
                            : currentPage + 1,
                    )
                }
            >
                Next »
            </button>
        </div>
    )
}