import React from 'react';
import {Footer} from './Footer';
import {Link} from 'react-router-dom';
import ExerciseSelectForm from './ExerciseSelectForm';

function ExerciseCard(props) {
    let exercise = props.exerciseData;
    return(
        <div className='exercise'>
            <img src={exercise['img']} alt={exercise['name']}/>
            <div className="exercise-introduction">
                <h2>{exercise['name']}</h2>
                <Link className='btn btn-success' to={'/exercises/' + exercise.id} role='button'>Learn More!</Link>
            </div>
        </div>
    )
}


export function ExerciseList(props) {
    let exercises = props.exercises;
    let exerciseCards = exercises.map((exercise) => {
        return(<ExerciseCard exerciseData={exercise} key={exercise['id'] }/>);
    });
    return (
        <div>
            <div className='header-footer logo-and-name'>
                <img src={"img/UFIT.jpg"} alt="UFit Logo" className="logo"/>
                <h1>Explore Exercises</h1>
            </div>
            <ExerciseSelectForm muscleOptions={props.muscleOptions} applyFilterCallback={props.applyFilterCallback}/>
            <div className='exercises'>
                {exerciseCards}
            </div>
            <Footer />
        </div>
    );
}