import React, {useState, useEffect, useContext} from "react";

import './Compare.css';
import test from "../../data/compare.json";
import iconMapper from "../../helpers/iconMapper";
import axios from "axios";
import {LocContext} from "../../context/LocContext";
import SortedList from "../sortedlist/SortedList";


function Compare({mylocations, tempmin, tempmax}) {

    const {favLocations, setFavLocFunction} = useContext(LocContext);
    const [tempResult, setTempResult] = useState(null);
    const [result, setResult] = useState(null);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [cities, setCities] = useState("");

    console.log('compare', mylocations);


    let temp = [];
    let citylist = [];


    useEffect(() => {
        console.log('useeffect');


        async function fetchTemp(locationKey, locationCity, index, tempResult, setTempResult, cities, setCities) {
            console.log('fetchTemp', locationKey, index);
            toggleLoading(true);
            toggleError(false);
            try {
                // const {data: [databack]} = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${process.env.REACT_APP_API_KEY}&details=true`);
                const {data: {main}} = await axios.get(`https://api.openweathermap.org/data/2.5/weather?id=${locationKey}&lang=fr&appid=${process.env.REACT_APP_API_OW_KEY}&units=metric`);
                  console.log('response', main);
                  temp[index] = main.temp_max;
                // console.log('data', (databack));
                // temp[index] = databack.Temperature.Metric.Value
                citylist[index] = locationCity;
                console.log('temp', temp);
                setTempResult(temp);
                setCities(citylist);


                toggleLoading(false);

            } catch (e) {
                toggleError(true);
                console.error(e);
                toggleLoading(false);

            }
        }

        toggleLoading(false);
        console.log('mylocations', mylocations.length);
        if (mylocations.length > 0) {

            for (let index = 0; index < 10; index++) {
                if (index < mylocations.length) {
                    console.log('index', index);
                    fetchTemp(mylocations[index].key, mylocations[index].city, index, tempResult, setTempResult, cities, setCities);
                }
            }
        }


    }, []);


    return (
        <>

            {error &&
                <span>  Something went wrong fetching the data  </span>
            }
            {loading && <span>Loading...</span>}

            {console.log('temp', tempResult, 'city', cities, 'mylocations', mylocations)}

            <div className="compare-header">
                <h5>Comparison</h5>
                <p>Min/Max °C</p>
                <p>Rain mm</p>
                <p>Wind km/h</p>
                <p>Sun hrs UV</p>
                <p>Air quality</p>

            </div>

            {(tempResult && tempResult.length > 0 && Object.keys(tempResult).length > 0) &&
                <>
                    {console.log(tempResult.length, Object.keys(tempResult).length, mylocations.length)}

                    <SortedList
                        templist={tempResult}
                        citylist={cities}
                        tempmin={tempmin}
                        tempmax={tempmax}
                        />



                </>
            }
        </>
    );
}

export default Compare;