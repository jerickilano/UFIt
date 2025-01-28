import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import { getDatabase, ref, set as firebaseSet, push, onValue } from 'firebase/database';
import { Footer } from './Footer';

export function ExerciseSpecific(props) {
    let exerciseid = useParams().id;
    let exercise =  _.find(props.exercises,function(exercise) {
        if(exercise.id === +exerciseid){
            return true;
        }
    } );
    let muscles = "";
    let equipment = "";
    let count = 0;
    let instructions = exercise['Instructions'].map((instruction) => {
        count = count + 1;
        return(<li key={count}>{instruction}</li>);
    })
    exercise['muscles'].forEach((muscle) => {
        muscles = muscles + " " + muscle;
    });
    if(exercise['equipments']) {
        equipment = "Equipment required.";
    }else{
        equipment = "No equipment required.";
    }
    const db = getDatabase();
    const [userName, setUserName] = useState('');
    const [feedback, setFeedback] = useState('');
    const [currentFeedback, setCurrentFeedback] = useState([]); 
    const handleSubmit = (event) => {
        event.preventDefault();
        const userFeedback={userName, feedback};
        const feedbackRef=push(ref(db, `exerciseFeedback/${exerciseid}`));
        firebaseSet(feedbackRef, userFeedback);
        setUserName('');
        setFeedback('');
    }
    /*useEffect(() => {
        const currentFeedbackRef = ref(db, `exerciseFeedback/${exerciseid}`);
        const unregisterFunction = onValue(currentFeedbackRef, (snapshot) => {
            const feedbackValue = snapshot.val();
            const currentFeedbackValue = Object.values(feedbackValue).map(feedback => feedback);
            setCurrentFeedback(currentFeedbackValue);
        })
        function cleanup() {
            unregisterFunction();
        }
        return cleanup;
      })
    */
    useEffect(() => {
        const currentFeedbackRef = ref(db, `exerciseFeedback/${exerciseid}`);
        const unregisterFunction = onValue(currentFeedbackRef, (snapshot) => {
        const feedbackValue = snapshot.val();
            const currentFeedbackValue = feedbackValue ? Object.values(feedbackValue).map(feedback => feedback) : [];
            setCurrentFeedback(currentFeedbackValue);
        });
        return () => {
            unregisterFunction();
        };
    }, [db, exerciseid]);
  
    return(
        <div>
            <header>
                <div className='header-footer'>
                    <h1>{exercise['name']}</h1>
                </div>
            </header>
            <main>
                <div className='muscle-info'>
                    <p>{"Muscle: " + muscles}</p>
                    <p>{"Equipment: " + equipment}</p>
                    <p>Instruction:</p>
                    <ol className='instruction'>
                        {instructions}
                    </ol>
                    <p>Feedback and Reviews:</p>
                </div>
                <div>
                    <ul className='review-info'>
                        {currentFeedback.map((feedbackItem, index) => (
                            <ol key={index}>
                                {feedbackItem.userName}: {feedbackItem.feedback}
                            </ol>
                        ))}
                    </ul>
                </div>
                <form>
                    <label>
                        User Name:
                        <input type='text' name='userName' value={userName} onChange={(e) => setUserName(e.target.value)} />
                    </label>
                    <label>
                        Feedback:
                        <input type='text' name='feedback' value={feedback} onChange={(e) => setFeedback(e.target.value)} />
                    </label>
                    <button className="form-button" type='button' onClick={handleSubmit}>Submit</button>
                </form>
            </main>
            <Footer/>
        </div>
    )
}