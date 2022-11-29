import React, {useState, useEffect, useContext} from "react";

import './Compare.css';
import test from "../../data/compare.json";
import iconMapper from "../../helpers/iconMapper";
import axios from "axios";
import {LocContext} from "../../context/LocContext";


function Compare({mylocations, tempmin, tempmax}) {

    const {favLocations, setFavLocFunction} = useContext(LocContext);
    const [tempResult, setTempResult] = useState(null);
    const [result, setResult] = useState(null);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [lines, setLines] = useState(null);
    const [cities, setCities] = useState("");


    console.log('compare', mylocations);
    if (Object.keys(mylocations).length > 0) {
        if (!mylocations[0].key) {
            const scrollArray = mylocations.shift();
            // mylocations = scrollArray;
            console.log('scroll', mylocations);
        }
    }

    // testing purposes
    // const conditions = test.map((record) => {
    //         return ({Temp: record.Temperature.Metric.Value});
    //     }
    // );
    // const compareResultTest = conditions.map((condition, index) => {
    //     return ({city: mylocations[index], tempmax: condition.Temp, tempmin: 0});
    // });
    let temp = [];
    let citylist = [];

    useEffect(() => {
        console.log('useeffect');

        async function fetchTemp(locationKey, locationCity, index, tempResult, setTempResult, cities, setCities, result, setResult, lines, setLines) {
            console.log('fetchTemp', locationKey, index);
            toggleLoading(true);
            toggleError(false);
            try {
                // const {data: [databack]} = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${process.env.REACT_APP_API_KEY}&details=true`);
                // const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q={locationCity},FR&limit=5&appid=71ad9bd7fd90f6e8a85aed2d949febfc`);
                const {data: {main}} = await axios.get(`https://api.openweathermap.org/data/2.5/weather?id=${locationKey}&lang=fr&appid=71ad9bd7fd90f6e8a85aed2d949febfc&units=metric`);
                console.log('response', main);
                temp[index] = main.temp_max;
                // console.log('data', (databack));
                // temp[index] = databack.Temperature.Metric.Value
                citylist[index] = locationCity;
                console.log('temp', temp);
                setTempResult(temp);
                setCities(citylist);

                // for testing purposes
                // console.log('test', test[index]);
                // temp[index] = test[0].Temperature.Metric.Value;
                // const temp2 = [10.5, 20, 15, 13, 18, 21, 18, 15, 5, 9]; /* for testing */
                // temp[index] = temp2[index]; /* for testing */


                // const result2 = object.sort((a, b) => b.tempmax - a.tempmax);
                // console.log('sort', result2);
                // setLines(result2);
                toggleLoading(false);

            } catch (e) {
                toggleError(true);
                console.error(e);
                toggleLoading(false);

            }
        }

        toggleLoading(false);

        if (mylocations.length > 0) {

            for (let index = 0; index < 10; index++) {
                if (index < mylocations.length) {
                    console.log('index', index);
                    fetchTemp(mylocations[index].key, mylocations[index].city, index, tempResult, setTempResult, cities, setCities, result, setResult, lines, setLines);
                }
            }
        }

    }, []);




    return (
        <>
            {console.log('temp', tempResult, 'city', cities, 'result' , result)}
            <div className="compare-header">
                <h5>Comparison</h5>
                <p>Min/Max °C</p>
                <p>Rain mm</p>
                <p>Wind km/h</p>
                <p>Sun hrs UV</p>
                <p>Air quality</p>

            </div>
            {tempResult &&
                <>
                    {tempResult.map((record, index) => {
                              return (
                                <div className="compare-grid" key={cities[index]}>

                                    <p> {cities[index]} 0/ {record} {result.key} </p>
                                </div>
                            )

                        ;
                    })}
                </>
            }
        </>
    );
}

export default Compare;