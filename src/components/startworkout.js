import React, {useState, useEffect} from 'react';
import { Footer } from './Footer';
import { getDatabase, ref, set as firebaseSet, push, onValue } from 'firebase/database';
import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { Link } from 'react-router-dom';

// Represents a single workout plan the user created
function WorkoutItem({ name, exercises }) {
  return (
    <tr>
      <td>{name}</td>
      <td>
      {exercises.map((exercise, index) => (
          <div key={index}>{exercise.name}</div>
        ))}
      </td>
      <td>
      <Link class="link-button" to='/timer'>Start Workout</Link>
      </td>
    </tr>
  );
}

// Hard Coded Table for now
// Must reference user's created plans
function StartWorkout() {
  const [exercisePlans, setExercisePlans] = useState([]);
  useEffect(() => {
    const db = getDatabase();
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      console.error('User not authenticated.');
      return;
    }
    const exerciseRef = ref(db, `userWorkoutPlans/${user.uid}`);
    const unregisterFunction = onValue(exerciseRef, (snapshot) => {
        const exerciseValue = snapshot.val();
        const userExercisePlans = Object.values(exerciseValue).map(plan => plan);
        setExercisePlans(userExercisePlans);
    })
    function cleanup() {
        unregisterFunction();
    }
    return cleanup;
  })

  return (
    <div className="StartWorkout" id="start-workout">
      <header>
        <div className="header-footer">
          <img src={"img/UFIT.jpg"} alt="UFit Logo" className="logo"/>
          <h1>Start Workout</h1>
        </div>
      </header>
      <main>
        <table>
          <thead>
            <tr>
              <th scope="col">Workout Plan</th>
              <th scope="col">Exercises</th>
              <th scope="col">Start Timer</th>
            </tr>
          </thead>
          <tbody>
            {exercisePlans.map((plan, index) => (
              <WorkoutItem key={index} name={plan.planName} exercises={plan.exercises} />
            ))}
          </tbody>
        </table>
      </main>
      <Footer />
    </div>
  );
}

export default StartWorkout;