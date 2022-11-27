import React, {useContext, useState, useEffect} from 'react';
import './LocMarker.css';
import {ReactComponent as Favorite} from "../../assets/icons/star.svg";
import {LocContext} from "../../context/LocContext";

function LocMarker({checked, toggleChecked, marked, setMarked, locationKey, cityName}) {

    const {favLocations, setFavLocFunction} = useContext(LocContext);

    console.log('props', (cityName), (checked), (marked), (locationKey), (favLocations));

    // if (favLocations && favLocations[0].key === locationKey) {
    if (favLocations.find((found) => {
        return found.key === locationKey;
    })) {
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
            console.log('push', favLocations);
            // obj.push({key: locationKey, city: ""})
            favLocations.push({key: locationKey, city: cityName});
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