import React, {useContext, useState, useEffect} from 'react';
import './LocMarker.css';
import {ReactComponent as Favorite} from "../../assets/icons/star.svg";
import {LocContext} from "../../context/LocContext";

function LocMarker({checked, toggleChecked, marked, setMarked,locationKey}) {

    const {favLocations, setFavLocFunction} = useContext(LocContext);
    console.log('props', (checked), (marked), (locationKey), (favLocations));

    if (favLocations.includes(locationKey)) {
        toggleChecked(true);
        setMarked("var(--bordertile)");

    } else {
        toggleChecked(false);
        setMarked("white");
    }


    function toggleMarkOnClick(e) {
        if (checked) {
            setMarked("white");
            favLocations.splice(favLocations.indexOf(locationKey), 1);
            setFavLocFunction(favLocations);

        } else {
            setMarked("var(--bordertile)");
            favLocations.push(locationKey);
            setFavLocFunction(favLocations);
        }
        ;

        toggleChecked(!checked)

    }


    return (
        <>

            <span className="star-wrapper">
                <input type="checkbox"
                       className="marking-box"
                       id="favor-mark"
                       checked={checked}
                       onChange={toggleMarkOnClick}
                />
                                        </span>
            <Favorite fill={marked}/>
        </>
    );
}

export default LocMarker;