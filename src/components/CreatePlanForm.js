import React, {useState} from 'react';

export function CreatePlanForm(props) {
    const initialValues = {
        planName:'',
        exerciseOneName: '',
        exerciseOneSets: '',
        exerciseOneRepititions: '',
        exerciseTwoName: '',
        exerciseTwoSets: '',
        exerciseTwoRepititions: '',
    }
    const[values, setValues] = useState(initialValues);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    return (
        <form>
            <label>
                Plan Name:
                <input type ='text' value={values.planName} onChange={handleInputChange} />
            </label>
            <label>
                Exercise 1
                <input value={values.exerciseOneName} onChange={handleInputChange} />
            </label>
            <label>
                Exercise 1 Sets
                <input value={values.exerciseOneSets} onChange={handleInputChange} />
            </label>
            <label>
                Exercise 1 Repititions Per Set
                <input value={values.exerciseOneRepititions} onChange={handleInputChange} />
            </label>
            <label>
                Exercise 2
                <input value={values.exerciseTwoName}
                onChange={handleInputChange} />
            </label>
            <label>
                Exercise 2 Sets
                <input value={values.exerciseTwoSets} onChange={handleInputChange} />
            </label>
            <label>
                Exercise 2 Repititons
                <input value={values.exerciseTwoRepititions} onChange={handleInputChange} />
            </label>
            <button type='submit'>Create Plan</button>
        </form>
    )
}