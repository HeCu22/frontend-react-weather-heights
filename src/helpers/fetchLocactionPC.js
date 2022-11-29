import React from "react";
import axios from "axios"


async function fetchLocationKey(departementcode,locationKey,setLocationKey,error,toggleError,loading,toggleLoading) {
    toggleLoading(true);
    console.log('fetchloc for', departementcode);
    try {
        toggleError(false);
        const {data: [data]} = await axios.get(`https://dataservice.accuweather.com/locations/v1/postalcodes/fr/search?apikey=${process.env.REACT_APP_API_KEY}&q=${departementcode}000`);
        console.log((data));
        setLocationKey((data));
    } catch (e) {
        console.error(e);
        toggleError(true);
    }
}

export default fetchLocationKey;