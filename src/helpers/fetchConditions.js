import React from "react";
import axios from "axios";


async function fetchConditions(locationKey, currConditions, setCurrConditions, error, toggleError, loading, toggleLoading) {
    toggleLoading(true);
    console.log('fetchconditions')
    try {
        toggleError(false);
        const {data: [data]} = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${process.env.REACT_APP_API_KEY}&details=true`);
        console.log((data));

        setCurrConditions((data));
    } catch (e) {
        console.error(e);
        toggleError(true);
    }

}




export default fetchConditions;