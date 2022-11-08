import React from "react";
import axios from "axios";

async function fetchForecast(locationKey, forecastData, setForecastData, error, toggleError, loading, toggleLoading) {
    toggleLoading(true);
    console.log('fetchforecast')
    try {
        toggleError(false);
        const {data} = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${process.env.REACT_APP_API_KEY}&details=true&metric=true`);
        console.log((data));
        setForecastData((data));
    } catch (e) {
        toggleError(true);
        console.error(e);

    }
}

export default fetchForecast;