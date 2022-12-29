import React from "react";
import axios from "axios";

async function fetchForecast(locationKey, forecastData, setForecastData, error, setError, loading, toggleLoading) {
    toggleLoading(true);
    setError('');
    try {
        const {data} = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${process.env.REACT_APP_API_KEY}&details=true&metric=true`);
        // console.log((data));
        setForecastData((data));
    } catch (e) {

        console.error(e);
        setError(e.message);

    }
    toggleLoading(false);
}

export default fetchForecast;