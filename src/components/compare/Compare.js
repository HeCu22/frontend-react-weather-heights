import React, {useState, useEffect, useContext} from "react";

import './Compare.css';
import test from "../../data/compare.json";
import iconMapper from "../../helpers/iconMapper";
import axios from "axios";
import {LocContext} from "../../context/LocContext";
import SortedList from "../sortedlist/SortedList";


function Compare({mylocations, state, counter, setCounter}) {

    const {favLocations, setFavLocFunction} = useContext(LocContext);
    const [tempResult, setTempResult] = useState(null);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    const lengthA = mylocations.length;

    let lines = [{}];

    async function fetchTemp() {
        // console.log('fetchTemp');
        toggleLoading(true);
        toggleError(false);
        try {
            if (mylocations.length > 0) {

                for (let indexI = 0; indexI < lengthA; indexI++) {
                    if (indexI < lengthA) {
                        console.log('index', indexI, mylocations[indexI].key);


                        // const {data: [databack]} = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${process.env.REACT_APP_API_KEY}&details=true`);
                        // const {data} = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}?apikey=${process.env.REACT_APP_API_KEY}&details=true&metric=true`);
                        const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/weather?id=${mylocations[indexI].key}&lang=en&appid=${process.env.REACT_APP_API_OW_KEY}&units=metric`);



                        // lines[indexI] = ({
                        //     key: mylocations[indexI].key,
                        //     city: mylocations[indexI].city,
                        //     temp: data.DailyForecasts[0].Temperature.Maximum.Value,
                        //     rain: data.DailyForecasts[0].Day.Rain.Value,
                        //     wind: data.DailyForecasts[0].Day.Wind.Speed.Value,
                        //     sunhrs: data.DailyForecasts[0].HoursOfSun,
                        //     airqual: data.DailyForecasts[0].AirAndPollen[0].Category
                        // })

                        let rain = 0;

                        if ((data.rain)) {
                            rain = data.rain[indexI];
                        }


                        lines[indexI] = ({
                            key: mylocations[indexI].key,
                            city: mylocations[indexI].city,
                            temp: data.main.temp_max,
                            tempmin: data.main.temp_min,
                            rain: rain,
                            wind: data.wind.speed,
                            winddirection: data.wind.deg,
                            description: data.weather[0].description,
icon: data.weather[0].icon
                        })

                        console.log('lines', lines);

                        console.log('data', (data));

                        // console.log('temp', temp, wind, rain);


                        console.log('fetchTemp', mylocations[indexI].city, indexI);
                    }
                }
                if (lines && !tempResult) {
                    console.log('set')
                    setTempResult(lines);
                }

            }

            toggleLoading(false);

        } catch (e) {
            toggleError(true);
            console.error(e);
            toggleLoading(false);

        }
    }


    useEffect(() => {
        console.log('🍌 Ik ben voor de eerste keer gemount in compare');

        toggleLoading(false);
        lines = [{}];

        console.log('mylocations', mylocations.length);
        if (mylocations.length > 0) {
            fetchTemp();
            if (lines && !tempResult) {
                console.log('set')
                setTempResult(lines);
            }

        }


    }, []);


    return (
        <>

            {error &&
                <span>  Something went wrong fetching the data  </span>
            }
            {loading && <span>Loading...</span>}

            {console.log('temp', tempResult, 'mylocations', lengthA)}

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
                        key={tempResult.key}
                        lines={tempResult}
                        // templist={tempResult}
                        // windlist={windResult}
                        // rainlist={rainResult}
                        // citylist={cities}
                        state={state}
                        counter={counter}
                        setCounter={setCounter}

                    />


                </>
            }
        </>
    );
}

export default Compare;