import React, {useState, useEffect, useContext} from "react";

import './Compare.css';
import test from "../../data/compare.json";
import iconMapper from "../../helpers/iconMapper";
import axios from "axios";
import {LocContext} from "../../context/LocContext";
import SortedList from "../sortedlist/SortedList";


function Compare({mylocations, state}) {

    const {favLocations, setFavLocFunction} = useContext(LocContext);
    const [tempResult, setTempResult] = useState(null);
    const [windResult, setWindResult] = useState(null);
    const [rainResult, setRainResult] = useState(null);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [cities, setCities] = useState("");

    // console.log('compare', mylocations, tempmax,tempmin,tempsort);

    const lengthA = mylocations.length;
    const temp = new Array(lengthA);
    const rain = new Array(lengthA);
    const wind = new Array(lengthA);
    const citylist = new Array(lengthA)

    async function fetchTemp(locationKey, locationCity, indexF) {
        // console.log('fetchTemp', locationKey, indexF);
        toggleLoading(true);
        toggleError(false);
        try {
            // const {data: [databack]} = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${process.env.REACT_APP_API_KEY}&details=true`);
            const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/weather?id=${locationKey}&lang=fr&appid=${process.env.REACT_APP_API_OW_KEY}&units=metric`);
            console.log('response', data);
            temp[indexF] = data.main.temp_max;
            wind[indexF] = data.wind.speed;
           if ((data.rain)) {data.rain[indexF] = 0} else {rain[indexF]=0;}
            // temp[indexF] = databack.Temperature.Metric.Value
           // rain[indexF] = databack.PrecipitationSummary.Precipitation.Metric.Value
            // wind[indexF] = databack.Wind.Speed.Metric.Value
            // // console.log('data', (databack));
            citylist[indexF] = locationCity;
            console.log('temp', temp, wind, rain);

            console.log('fetchTemp', locationKey, indexF);


            toggleLoading(false);

        } catch (e) {
            toggleError(true);
            console.error(e);
            toggleLoading(false);

        }
    }

    useEffect(() => {
         console.log('useeffect');

        toggleLoading(false);
        // console.log('mylocations', mylocations.length);
        if (mylocations.length > 0) {

            for (let indexI = 0; indexI < lengthA; indexI++) {
                if (indexI < lengthA) {
                    console.log('index', indexI);
                    fetchTemp(mylocations[indexI].key, mylocations[indexI].city, indexI);
                }
            }
            setTempResult(temp);
            setWindResult((wind));
            setRainResult((rain));
            setCities(citylist);

        }


    }, [state]);


    return (
        <>

            {error &&
                <span>  Something went wrong fetching the data  </span>
            }
            {loading && <span>Loading...</span>}

            {console.log('temp', tempResult, 'city', cities, 'mylocations', lengthA)}

            <div className="compare-header">
                <h5>Comparison</h5>
                <p>Min/Max °C</p>
                <p>Rain mm</p>
                <p>Wind km/h</p>
                <p>Sun hrs UV</p>
                <p>Air quality</p>

            </div>

            {(tempResult && tempResult.length === lengthA && Object.keys(tempResult).length === lengthA) &&
                <>
                    {console.log(tempResult.length, Object.keys(tempResult).length, mylocations.length)}

                    <SortedList
                        templist={tempResult}
                        windlist={windResult}
                        rainlist={rainResult}
                        citylist={cities}
                        state={state}

                    />


                </>
            }
        </>
    );
}

export default Compare;