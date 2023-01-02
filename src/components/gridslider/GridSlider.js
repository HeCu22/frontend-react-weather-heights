import React, {useEffect, useState} from 'react';
import './GridSlider.css';
import {Link} from "react-router-dom";

function GridSlider({gridOn, link}) {
    const [checked, toggleChecked] = useState(gridOn);

    // console.log('grid', gridOn)

    return (
        <div className="row">
            <p className="switch-label">
                Overview
            </p>

            <span className="switch-wrapper">
                     <Link to={link}>
            <input
                type="checkbox"
                className="switch"
                id="grid-system"
                checked={checked}
                onChange={() => toggleChecked(!checked)}
            />

            <label
                htmlFor="grid-system"
                className="switch-btn"
            />
                     </Link>
            </span>

            <p className="switch-label">
                Grid
            </p>
        </div>
    );
}

export default GridSlider;