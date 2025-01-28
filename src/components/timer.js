import React, { useState, useEffect } from 'react';

function ExerciseTimer() {
  const [exercises, setExercises] = useState([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    if (timerRunning) {
      const intervalId = setInterval(() => {
        if (timeRemaining > 0) {
          setTimeRemaining((prevTime) => prevTime - 1);
        } else {
          // Move to the next exercise when the timer reaches 0
          if (currentExerciseIndex < exercises.length - 1) {
            setCurrentExerciseIndex((prevIndex) => prevIndex + 1);
            setTimeRemaining(exercises[currentExerciseIndex + 1].time * 60);
          } else {
            // Stop the timer when all exercises are completed
            setTimerRunning(false);
          }
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [timerRunning, timeRemaining, exercises, currentExerciseIndex]);

  const handleStartTimer = () => {
    if (exercises.length > 0) {
      setTimerRunning(true);
      setTimeRemaining(exercises[0].time * 60);
    }
  };

  const handleStopTimer = () => {
    setTimerRunning(false);
  };

  const handleResetTimer = () => {
    setTimerRunning(false);
    setCurrentExerciseIndex(0);
    setTimeRemaining(0);
  };

  const handleExerciseInputChange = (index, event) => {
    const { name, value } = event.target;
    const newExercises = [...exercises];
    newExercises[index][name] = value;
    setExercises(newExercises);
  };

  const handleAddExercise = () => {
    setExercises([...exercises, { name: '', time: '' }]);
  };

  return (
    <div>
      <h2 className='timer'>Exercise Timer</h2>
      <div>
        <h3 className='timer'>Current Exercise: {exercises[currentExerciseIndex]?.name}</h3>
        <h3 className='timer'>
          Time Remaining: {Math.floor(timeRemaining / 60)} minutes{' '}
          {timeRemaining % 60} seconds
        </h3>
      </div>
      <form>
        <div className='form-container'>
          <button className='form-button-container' type="button" onClick={handleAddExercise}>
            Add Exercise
          </button>
          <button className='form-button-container' type="button" onClick={handleStartTimer}>
            Start Timer
          </button>
          <button className='form-button-container' type="button" onClick={handleStopTimer}>
            Stop Timer
          </button>
          <button className='form-button-container' type="button" onClick={handleResetTimer}>
            Reset Timer
          </button>
        </div>
        {exercises.map((exercise, index) => (
          <div key={index}>
            <label>
              Exercise Name:
              <input
                type="text"
                name="name"
                value={exercise.name}
                onChange={(e) => handleExerciseInputChange(index, e)}
              />
            </label>
            <label>
              Exercise Time (minutes):
              <input
                type="number"
                name="time"
                value={exercise.time}
                onChange={(e) => handleExerciseInputChange(index, e)}
              />
            </label>
          </div>
        ))}
      </form>
    </div>
  );
}

export default ExerciseTimer;