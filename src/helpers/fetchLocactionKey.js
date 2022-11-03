import React, {useState} from "react";
import axios from "axios"


async function fetchLocationKey(departementcode,locationKey,setLocationKey) {
    console.log('fetchloc for', departementcode);
    try {
        const {data: [data]} = await axios.get(`https://dataservice.accuweather.com/locations/v1/postalcodes/fr/search?apikey=${process.env.REACT_APP_API_KEY}&q=${departementcode}000`);
        console.log((data));
        setLocationKey((data));
    } catch (e) {
        console.error(e);
    }
}

export default fetchLocationKey;