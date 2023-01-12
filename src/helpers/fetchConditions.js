import React from "react";
import axios from "axios";

async function fetchConditions(locationKey, currConditions, setCurrConditions, error, setError, loading, toggleLoading) {
    toggleLoading(true);
    setError('');
       try {
        const {data: [data]} = await axios.get(`https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${process.env.REACT_APP_API_KEY}&details=true`);
        // console.log((data));
        setCurrConditions((data));
    } catch (e) {
        console.error(e);
        setError(e.message);

    }
    toggleLoading(false);
}




export default fetchConditions;