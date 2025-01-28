import React, {useState} from 'react';
import { getDatabase, ref, set as firebaseSet, push } from 'firebase/database';
import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
export function CreatePlanFormTest(props) {
    const db = getDatabase();
    const auth = getAuth();
    const [planName, setPlanName] = useState('');
    const [exercises, setExercises] = useState([
        {name: '', sets: '', repetitions: '', timePerSet: ''},
    ])
    const navigate = useNavigate();
    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newExercises = [...exercises];
        newExercises[index][name] = value;
        setExercises(newExercises);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const exercisePlan={planName, exercises};
        const user = auth.currentUser;
        if (!user) {
          console.error('User not authenticated.');
          return;
        }
        const newPlanRef=push(ref(db, `userWorkoutPlans/${user.uid}`));
        firebaseSet(newPlanRef, exercisePlan).then(() => console.log("Data Saved")).catch(err => console.log(err));
        setPlanName('');
        setExercises([{name: '', sets: '', repetitions: '', timePerSet: ''},]);
        navigate('/workoutplanstest');
    }
    const handleAddExercise = () => {
        setExercises([...exercises, {name: '', sets: '', repetitions: '', timePerSet: ''}]);
    }

    return (
        <form>
            <label>
                Plan Name:
                <input type='text' name='planName' value={planName} onChange={(e) => setPlanName(e.target.value)} />
            </label>
            {exercises.map((exercise, index) => (
                <div key={index}>
                    <label>
                        Exercise Name:
                        <input type='text' name='name' value={exercise.name} onChange={(e) => handleInputChange(index, e)} />
                    </label>
                    <label>
                        Exercise Sets:
                        <input type='text' name='sets' value={exercise.sets} onChange={(e) => handleInputChange(index, e)} />
                    </label>
                    <label>
                        Exercise Repetitions:
                        <input type='text' name='repetitions' value={exercise.repetitions} onChange={(e) => handleInputChange(index, e)} />
                    </label>
                    <label>
                        Time Per Set Goal (Minutes):
                        <input type='text' name='timePerSet' value={exercise.timePerSet} onChange={(e) => handleInputChange(index, e)} />
                    </label>
                </div>
            ))}
            <button class="form-button" type='button' onClick={handleAddExercise}>Add Exercise</button>
            <button class="form-button" type='button' onClick={handleSubmit}>Submit</button>
        </form>
    )
}