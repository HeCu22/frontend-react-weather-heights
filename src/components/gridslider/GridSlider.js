import React, {useState} from 'react';
import './GridSlider.css';

function GridSlider(props) {
    const [checked, toggleChecked] = useState(false);
    return (
        <div className="row">
             <p className="switch-label">
                Overview
            </p>

            <span className="switch-wrapper">
            <input
               type="checkbox"
               className="switch"
               id="grid-system"
               checked={!checked}
               onChange={() => toggleChecked(!checked)}
            />

            <label
               htmlFor="grid-system"
               className="switch-btn"
            />
            </span>

            <p className="switch-label">
                Grid
            </p>
        </div>
    );
}

export default GridSlider;