import React, {useContext, useState, useEffect} from 'react';
import './LocMarker.css';
import {ReactComponent as Favorite} from "../../assets/icons/star.svg";
import {LocContext} from "../../context/LocContext";

function LocMarker({checked, toggleChecked, marked, setMarked, locationKey, cityName}) {

    const {favLocations, setFavLocFunction} = useContext(LocContext);


    console.log('prop', checked, marked, locationKey, cityName);
    if (favLocations) {
        const lookupLoc = favLocations.find((found) => {
            return found.key === `${locationKey}`;
        });

        if (lookupLoc) {
            console.log('found', true);
            toggleChecked(true);
            setMarked("var(--bordertile)");
        }
    }
    console.log('prop2', checked, marked);

    function toggleMarkOnClick(e) {
        if (checked) {
            setMarked("white");
            favLocations.splice(favLocations.indexOf(locationKey), 1);
            setFavLocFunction(favLocations);

        } else {
            setMarked("var(--bordertile)");
            console.log('push', favLocations);
            if (Object.keys(favLocations).length > 0 && !favLocations[0].key) {
                favLocations[0] = ({key: locationKey, city: cityName})
            } else {
                favLocations.push({key: locationKey, city: cityName})
            }

            setFavLocFunction(favLocations);
        }
        ;
        toggleChecked(!checked);

    }


    return (
        <>
            {console.log('check', checked)}

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