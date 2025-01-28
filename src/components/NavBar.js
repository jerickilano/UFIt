import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';

export function NavBar(props) {
    const handlerClick = function() {
        var x = document.querySelector(".myLinks");
        if (x.style.display === "block") {
            x.style.display = "none";
        } else {
        x.style.display = "block";
        }
    };
    return (
        <nav>
            <div className="hamburgerMenu">
                <img src={"img/UFIT.jpg"} alt="UFit Logo" className="logo"/>
                <ul className='myLinks'>
                    <li><NavLink to="/home">Home</NavLink></li>
                    <li><NavLink to="/workoutplanstest">Workout Plans</NavLink></li>
                    <li><NavLink to="/start">Start</NavLink></li>
                    <li><NavLink to="/exercises">Explore Exercises</NavLink></li>
                </ul>
                <img src={"img/hamburger-menu.jpg"} alt='Hamburger menu icon' onClick={handlerClick} className='hamicon'/>
            </div>
            <div className="navbarcustomize">
                <ul>
                    <li><NavLink to="/home">Home</NavLink></li>
                    <li><NavLink to="/workoutplanstest">Workout Plans</NavLink></li>
                    <li><NavLink to="/start">Start</NavLink></li>
                    <li><NavLink to="/exercises">Explore Exercises</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}