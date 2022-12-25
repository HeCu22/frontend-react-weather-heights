import React from "react";
import axios from "axios";


async function fetchLocationCity(city, location, setLocation, error, setError, loading, toggleLoading) {
    toggleLoading(true);
    console.log('fetch location city', (city), `https://dataservice.accuweather.com/locations/v1/search?q=${city}&apikey=${process.env.REACT_APP_API_KEY}&offset=1`);
    try {
        setError('');

        const {data: [data]} = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/fr/search?q=${city}&apikey=${process.env.REACT_APP_API_KEY}&offset=1`);
        console.log('data city', (data));
        setLocation((data));


    } catch (e) {
        console.error(e)
        console.log('e', e.message);
        setError(e.message);

    }
    toggleLoading(false);
}

export default fetchLocationCity;