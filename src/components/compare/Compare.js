import React, {useState, useEffect} from "react";
import './Compare.css';
import axios from "axios";
import SortedList from "../sortedlist/SortedList";


function Compare({mylocations, state, linesSave, setLinesSave, counter, setCounter}) {


    const [tempResult, setTempResult] = useState(null);
    const [error, setError] = useState('');
    const [loading, toggleLoading] = useState(false);

    const lengthA = mylocations.length;


    async function fetchTemp() {

        toggleLoading(true);
        setError('');
        try {
            if (mylocations.length > 0) {

                for (let indexI = 0; indexI < lengthA; indexI++) {
                    if (indexI < lengthA) {

                        // when accuwaeather api is used
                        const {data} = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${mylocations[indexI].key}?apikey=${process.env.REACT_APP_API_KEY}&details=true&metric=true`);

                        // for test purpose, when openwaeather api is used
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
                        //
                        // for test purpose, when openwaeather api is used
                        // let rain = 0;
                        // if ((data.rain)) {
                        //     rain = data.rain[indexI];
                        // }
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

                        // console.log('linesSave', linesSave);

                        // console.log('data', (data));


                    }
                }
                if (linesSave && !tempResult) {
                    setTempResult(linesSave);

                }
            }
        } catch (e) {

            console.error(e);
            setError(e.message);

        }
        toggleLoading(false);
    }


    useEffect(() => {

        if (counter === 1) {
            toggleLoading(false);

            if (mylocations.length > 0) {
                fetchTemp();
                if (linesSave && !tempResult) {
                    setTempResult(linesSave);
                    setLinesSave(linesSave);
                }

            }

        } else {
            setTempResult(linesSave)
        }
        ;
    }, []);


    return (
        <>

            {error &&
                <span>  Something went wrong fetching the data  </span>
            }
            {loading && <span>Loading...</span>}

            <div className="compare-header">
                <h1>Top locations</h1>
                <div className="compare-sub-header">
                    <p>Forecasted Today</p>

                </div>

            </div>

            {(tempResult && tempResult.length === lengthA && Object.keys(tempResult).length === lengthA) &&
                <>
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