import React, {useState, useEffect, useContext} from "react";

import './Compare.css';
import test from "../../data/compare.json";
import axios from "axios";
import {LocContext} from "../../context/LocContext";
import SortedList from "../sortedlist/SortedList";


function Compare({mylocations, state, linesSave, setLinesSave, counter, setCounter}) {

    const {favLocations, setFavLocFunction} = useContext(LocContext);
    const [tempResult, setTempResult] = useState(null);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    const lengthA = mylocations.length;


    async function fetchTemp() {

        toggleLoading(true);
        toggleError(false);
        try {
            if (mylocations.length > 0) {

                for (let indexI = 0; indexI < lengthA; indexI++) {
                    if (indexI < lengthA) {
                        console.log('index', indexI, mylocations[indexI].key);

                        const {data} = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${mylocations[indexI].key}?apikey=${process.env.REACT_APP_API_KEY}&details=true&metric=true`);
                        // const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/weather?id=${mylocations[indexI].key}&lang=en&appid=${process.env.REACT_APP_API_OW_KEY}&units=metric`);


                        linesSave[indexI] = ({
                            key: mylocations[indexI].key,
                            city: mylocations[indexI].city,
                            icon: data.DailyForecasts[0].Day.Icon,
                            description: data.DailyForecasts[0].Day.IconPhrase,
                            tempmin: data.DailyForecasts[0].Temperature.Minimum.Value,
                            temp: data.DailyForecasts[0].Temperature.Maximum.Value,
                            rain: data.DailyForecasts[0].Day.Rain.Value,
                            winddirection: data.DailyForecasts[0].Day.Wind.Direction.English,
                            wind: data.DailyForecasts[0].Day.Wind.Speed.Value,
                            windgust: data.DailyForecasts[0].Day.WindGust.Speed.Value,
                            sunhrs: data.DailyForecasts[0].HoursOfSun,
                            airqual: data.DailyForecasts[0].AirAndPollen[0].Category
                        })

                        // let rain = 0;
                        //
                        // if ((data.rain)) {
                        //     rain = data.rain[indexI];
                        // }
                        //
                        //
                        // lines[indexI] = ({
                        //     key: mylocations[indexI].key,
                        //     city: mylocations[indexI].city,
                        //     temp: data.main.temp_max,
                        //     tempmin: data.main.temp_min,
                        //     rain: rain,
                        //     wind: data.wind.speed,
                        //     winddirection: data.wind.deg,
                        //     description: data.weather[0].description,
                        //     icon: data.weather[0].icon
                        // })

                        console.log('linesSave', linesSave);

                        console.log('data', (data));


                    }
                }
                if (linesSave && !tempResult) {
                    console.log('set')
                    setTempResult(linesSave);

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
        if (counter === 1) {
            toggleLoading(false);


            console.log('mylocations', mylocations.length);
            if (mylocations.length > 0) {
                fetchTemp();
                if (linesSave && !tempResult) {
                    console.log('set')
                    setTempResult(linesSave);
                    setLinesSave(linesSave);
                }

            }

        } else {
            setTempResult(linesSave)
        };
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
                <div className="compare-sub-header">
                    {/*<p>ForecastToday</p>*/}
                    <p><span>Min/Max °C</span></p>
                    <p>Rain mm</p>
                    <p>Wind km/h</p>
                    <p>Sun hrs</p>
                    <p>Air quality</p>
                </div>

            </div>

            {(tempResult && tempResult.length === lengthA && Object.keys(tempResult).length === lengthA) &&
                <>
                    {console.log(tempResult.length, Object.keys(tempResult).length, mylocations.length)}

                    <SortedList
                        key={tempResult.key}
                        lines={tempResult}
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