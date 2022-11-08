import React from "react";
import axios from "axios";
import fetchConditions from "./fetchConditions";


async function fetchLocationCity(city, location, setLocation, error, toggleError, loading, toggleLoading) {
    toggleLoading(true);
    console.log('fetch location city', (city), `https://dataservice.accuweather.com/locations/v1/search?q=${city},FR&apikey=${process.env.REACT_APP_API_KEY}&offset=1`);
    try {
        toggleError(false);
        const {data: [data]} = await axios.get(`https://dataservice.accuweather.com/locations/v1/search?q=${city},FR&apikey=${process.env.REACT_APP_API_KEY}&offset=1`);
        console.log('data city', (data));
        setLocation((data));


    } catch (e) {
        console.error(e);
        toggleError(true);

    }
}

export default fetchLocationCity;