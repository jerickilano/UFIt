import React, {useState} from "react";

export default function ExerciseSelectForm(props) {
    let [selectedMuscle, setMuscle] = useState('');
    let [includeEquipment, setInclusion] = useState(false);
    const handlerSelect = function(event) {
        let muscle = event.target.value;
        setMuscle(muscle);
    };
    const handlerCheck = function(event) {
        let checked = event.target.checked;
        setInclusion(checked);
    };
    const handlerClick = function() {
        props.applyFilterCallback(selectedMuscle, includeEquipment);
    };
    let optionElems = props.muscleOptions.map((muscleName) => {
        return <option key={muscleName} value={muscleName}>{muscleName}</option>
    });
    return (
        <div className="row">
          <div className="col-sm">
            <select id="muscleSelect" value={selectedMuscle} onChange={handlerSelect} className="form-select">
              <option value="">Show all muscles</option>
              {optionElems}
            </select>
          </div>
          <div className="col-sm">
            <div className="row">
              <label htmlFor="equipmentCheckbox" className="elabel col-sm">Equipment</label>
              <input className='col-sm' id="equipmentCheckbox" type="checkbox" value="" checked={includeEquipment} onChange={handlerCheck}/>
            </div>
          </div>
          <div className="col-sm">
            <button id="submitButton" type="submit" onClick={handlerClick} className="btn btn-success">Apply Filter</button>
          </div>
        </div>
    );
}