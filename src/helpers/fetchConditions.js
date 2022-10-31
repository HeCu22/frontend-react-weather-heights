import React from "react";
import axios from "axios";

async function fetchConditions(locationKey,currConditions,setCurrConditions) {

    console.log('fetchcond')
    try {

        const {data: [data]} = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${process.env.REACT_APP_API_KEY}`);

        console.log((data));
        setCurrConditions((data));
    } catch (e) {
        console.error(e);
    }
}


export default fetchConditions;