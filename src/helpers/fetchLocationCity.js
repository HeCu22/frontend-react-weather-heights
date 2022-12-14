import React from "react";
import axios from "axios";


async function fetchLocationCity(city, location, setLocation, error, toggleError, loading, toggleLoading) {
    toggleLoading(true);
    console.log('fetch location city', (city), `https://dataservice.accuweather.com/locations/v1/search?q=${city}&apikey=${process.env.REACT_APP_API_KEY}&offset=1`);
    try {
        toggleError(false);
     //   http://dataservice.accuweather.com/locations/v1/cities/fr/63/search?apikey=Jq0GXT92W5N47EvhMYKiHyXW6iJlKUIA&q=beaumont&offset=1
        const {data: [data]} = await axios.get(`https://dataservice.accuweather.com/locations/v1/search?q=${city}&apikey=${process.env.REACT_APP_API_KEY}&offset=1`);
        console.log('data city', (data));
        setLocation((data));


    } catch (e) {
        console.error(e);
        toggleError(true);

    }
    toggleLoading(false);
}

export default fetchLocationCity;