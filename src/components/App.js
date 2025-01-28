import React, {useState} from "react";
import { ExerciseList } from "./ExerciseList.js";
import { ExerciseSpecific } from "./ExerciseSpecific.js";
import {Routes, Route, Navigate} from "react-router-dom";
import { NavBar } from "./NavBar.js";
import { HomePage } from "./HomePage.js";
import { CreatePlan } from "./CreatePlan.js";
import { CreatePlanFormTest } from './CreatePlanFormTest.js';
import { PlansTest } from './PlansTest.js';
import StartWorkout from "./startworkout.js";
import ExercisePage from "./ExercisePage.js";
import Timer from './timer.js';


function App(props) {
    let [filterMuscle, setMuscle] = useState('');
    let [equipmentCheck, setCheck] = useState(false);
    let displayedExercise = props.exerciseData.filter((exercise) => {
        if (filterMuscle === '' && equipmentCheck === false) {
            return true;
        } else if (equipmentCheck === exercise.equipments && exercise['muscles'].includes(filterMuscle)){
            return true;
        } else if (filterMuscle === '' && equipmentCheck === exercise.equipments){
            return true;
        } else {
            return false;
        }
    });
    const applyFilter = function(muscle, inclusion) {
        setMuscle(muscle);
        setCheck(inclusion);
    }
    let muscles = [];
    props.exerciseData.forEach((exercise) => {
        muscles = muscles.concat(exercise.muscles);
    });
    let uniqueMuscles = [];
    uniqueMuscles = Array.from(new Set(muscles));
    return (
        <div>
            <NavBar/>
            
            <Routes>
                <Route path="home" element={<HomePage/>}/>
                <Route path="workoutplanstest" element={<PlansTest/>}/>
                <Route path="workoutplansform" element={<CreatePlanFormTest />}/>
                <Route path="start" element={<StartWorkout/>}/>
                <Route path="timer" element={<Timer />}/>
                <Route path="exercises" element={<ExercisePage/>}>
                    <Route path=":id" element={<ExerciseSpecific exercises={props.exerciseData}/>}/>
                    <Route index element={<ExerciseList exercises={displayedExercise} muscleOptions={uniqueMuscles} applyFilterCallback={applyFilter}/>}/>
                </Route>
                <Route path="*" element={<Navigate to="home"/>}/>
            </Routes>




        </div>
    );
}
export default App;