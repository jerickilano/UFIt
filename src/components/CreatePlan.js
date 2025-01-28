import React, {useState} from 'react';
import {NavBar} from './NavBar';
import {CreatePlanForm} from './CreatePlanForm';
import { CreatePlanFormTest } from './CreatePlanFormTest';
import { Link } from 'react-router-dom';
import { Footer } from './Footer';

export function CreatePlan(props) {
    return (
        <div>
            <header>
                <div className="header-footer">
                <img src={"img/UFIT.jpg"} alt="UFit Logo" className="logo"/>
                <h1>Your Workout Plans</h1>
                </div>
            </header>
            <main>
                <Link to='/workoutplansform' className='btn btn-succcess'>Create a New Plan</Link>
            </main>
            <Footer />
        </div>
        )
}