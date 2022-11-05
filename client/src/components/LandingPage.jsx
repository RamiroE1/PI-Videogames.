import React from "react";
import { Link } from "react-router-dom";
import video from '../Img/Gamegif.1.mp4';
import e from './LandingPage.module.css'


export default function LandingPage(){
    return(
        <div>
            <video className={e.video} muted autoPlay loop>
                <source src={video} type="video/mp4" />
            </video>
            <h1 className={e.h1}>Bienvenidos a Videogames</h1>
            <Link to ='/home'>
                <button className={e.btn}>Ingresar</button>
            </Link>
        </div>
    );
}