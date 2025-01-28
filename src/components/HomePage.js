import React, {useState} from 'react';
import {NavBar} from './NavBar';
import { Footer } from './Footer';

export function HomePage(props) {
    return (
        <div className='index'>
            <header>
                <div className="header-footer logo-and-name">
                    <img src={"img/UFIT.jpg"} alt="UFit Logo" className="logo"/>
                    <h1>UFit</h1>
              </div>
            </header>
            <main>
                <div className="intro-section">
                    <p>Welcome to UFit, your go-to application for achieving your fitness goals. Whether you're a beginner or an experienced fitness enthusiast, UFit is designed to help you plan and execute your workouts with ease.</p>
                    <p>Key Features:</p>
                    <ul>
                        <li>Personalized Workout Plans</li>
                        <li>Customizable Timers for Your Exercises</li>
                        <li>Explore a Wide Range of Exercises</li>
                        <li>Track Your Progress and Achievements</li>
                    </ul>
                    <p>Ready to transform your fitness journey? Click the button below to get started!</p>
                    <a href="workoutplanstest" className="btn btn-success btn-lg">Get Started</a>
                </div>
                <img className='background' src={"img/gym-background.jpg"} alt="a row of treadmills at at a gym"/>
            </main>
            <Footer/>
        </div>
    )
}