import React, {useState} from "react";
import axios from "axios";
import fetchConditions from "./fetchConditions";



async function fetchLocationCity(city,currConditions,setCurrConditions,location,setLocation) {

    console.log(' city',(city))
    try {
        // const {data} = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/neighbors/146551?apikey=${process.env.REACT_APP_API_KEY}&details=true`);
        //   const {data} = await axios.get(`https://dataservice.accuweather.com/locations/v1/adminareas/fr-36?apikey=${process.env.REACT_APP_API_KEY}&offset=1`);
        //       const {data} = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/623?apikey=${process.env.REACT_APP_API_KEY}`);
        const {data: [data]} = await axios.get(`https://dataservice.accuweather.com/locations/v1/search?q={city},FR&apikey=${process.env.REACT_APP_API_KEY}&offset=1`);
        console.log('data city', (data));
        setLocation((data));


        if (!currConditions) {
            fetchConditions((data.Key), currConditions, setCurrConditions)
        } else {
            console.log('currcond', (currConditions));
        }

    } catch (e) {
        console.error(e);
    }
}

export default fetchLocationCity;