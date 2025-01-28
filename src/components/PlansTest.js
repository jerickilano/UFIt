import React, {useState, useEffect} from 'react';
import { getDatabase, ref, set as firebaseSet, push, onValue } from 'firebase/database';
import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { Footer } from './Footer';

export function PlansTest(props) {
    const [exercisePlanNames, setExercisePlanNames] = useState([]);
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
            console.log(exerciseValue);
            if (exerciseValue) {
                const names = Object.values(exerciseValue).map(plan => plan.planName);
                setExercisePlanNames(names);
            }
        })
        function cleanup() {
            unregisterFunction();
        }
        return cleanup;
    })
    return (
        <div>
            <header>
                <div className="header-footer">
                <img src={"img/UFIT.jpg"} alt="UFit Logo" className="logo"/>
                <h1>Your Workout Plans</h1>
                </div>
            </header>
            <main>
                <table>
                    <thead>
                        <tr>
                        <th scope="col">Existing Plans</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exercisePlanNames.map((planName, index) => (
                            <div className="start-workout" key={index}>{planName}</div>
                        ))}
                    </tbody>
                </table>

                {/* <ul>
                    {exercisePlanNames.map((planName, index) => (
                        <li key={index}>{planName}</li>
                    ))}
                </ul> */}

                <Link class="link-button" to='/workoutplansform'>Create a New Plan</Link>
            </main>
            <Footer />
        </div>
        )
}