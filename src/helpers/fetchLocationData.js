import React from "react";
import axios from "axios";

async function fetchLocationData(locationKey, locationData, setLocationData, error, setError, loading, toggleLoading) {
    toggleLoading(true);
    try {
        setError('');
        const {data} = await axios.get(`https://dataservice.accuweather.com/locations/v1/${locationKey}?apikey=${process.env.REACT_APP_API_KEY}`);
        // console.log((data));
        setLocationData((data));
    } catch (e) {
        console.error(e);
        setError(e.message);
    }
    toggleLoading(false);
}

export default fetchLocationData;