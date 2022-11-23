import React from "react";
import axios from "axios";


async function fetchTemp(locationKey, currConditions, setCurrConditions, error, toggleError, loading, toggleLoading) {
   let temp2 = 0;
    toggleLoading(true);
    console.log('fetchconditions')
    try {
        toggleError(false);
        // const {data: [databack]} = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${process.env.REACT_APP_API_KEY}&details=true`);
        // temp2 = databack.Temperature.Metric.Value;
        temp2 = 10.5;
        console.log(temp2);

        // setCurrConditions((databack));
    } catch (e) {
        console.error(e);
        toggleError(true);
    }



}


export default fetchTemp;