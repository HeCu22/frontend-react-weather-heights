import React, {useEffect, useState} from 'react';
import tslocation from '../../data/tslocation.json';
import test from '../../data/test.json';
import tsforecast from '../../data/tsforecast.json';
import {useParams} from 'react-router-dom';
import './Citydetails.css';
import fetchLocationCity from "../../helpers/fetchLocationCity";
import iconMapper from "../../helpers/iconMapper";
import Button from "../../components/button/Button";
import makeDay from "../../helpers/makeDay";
import {ReactComponent as Goto} from "../../assets/icons/go.svg";
import fetchConditions from "../../helpers/fetchConditions";
import fetchForecast from "../../helpers/fetchForecast";
import Mainnav from "../../components/mainnav/Mainnav";

import LocMarker from "../../components/locmarker/LocMarker";

function Citydetails(props) {
    const {city} = useParams();
    const [words, setWords] = useState(city.split(','));
    const [background, setBackground] = useState("outer-container main-header-background");
    const [location, setLocation] = useState(null);
    const [more, toggleMore] = useState(false);
    const [currConditions, setCurrConditions] = useState(null);
    const [forecastData, setForecastData] = useState(null)
    const [marked, setMarked] = useState("white");
    const [checked, toggleChecked] = useState(false);
    const [error, setError] = useState("");
    const [errorFc, setErrorFc] = useState("");
    const [loading, toggleLoading] = useState(true);


    useEffect(() => {
        if (!location) {
            let searchcity = city;
            if (words[1] === "undefined") {searchcity = words[0].concat(",FR")}
            // console.log('fetchcity', searchcity)
            fetchLocationCity((searchcity), location, setLocation, error, setError, loading, toggleLoading);
            setBackground("outer-container impression01");
            // setLocation(tslocation[0]);

        }
    }, []);

    useEffect(() => {

        if (!currConditions && location) {
            if (more) {
                fetchConditions((location.Key), currConditions, setCurrConditions, error, setError, loading, toggleLoading);
                // setCurrConditions(test[0]);
                if (!forecastData && location) {
                    fetchForecast((location.Key), forecastData, setForecastData, errorFc, setErrorFc, loading, toggleLoading);
                    // setForecastData(tsforecast[0]);
                }
            }
        }

    }, [more, location]);


    return (
        <>

            {loading && <span>Loading...</span>}

            <Mainnav>
                <ul className="outer-row">
                    <li> France</li>
                    <li> City</li>
                    <li> Details</li>
                </ul>
            </Mainnav>
            <main className={background}>
                <div className="inner-container">
                    <div className="outer-row">
                        <div className="header-content">
                            {location ?
                                <>
                                    <h1>Weather Heights France {location.AdministrativeArea.EnglishName}</h1>
                                    <h2>{words[0]}
                                        {location &&
                                            <LocMarker
                                                key={location.Key}
                                                checked={checked}
                                                toggleChecked={toggleChecked}
                                                marked={marked}
                                                setMarked={setMarked}
                                                locationKey={location.Key}
                                                cityName={words[0]}
                                            />
                                        }

                                    </h2>
                                    <p><span
                                        className="small-text"> Coordinates: {location.GeoPosition.Latitude.toFixed(2)} / {location.GeoPosition.Longitude.toFixed(2)} </span>
                                    </p>
                                </>
                                : <>
                                    <h1>Weather Heights </h1>
                                    {words[1] === "undefined" ?
                                        <h2>{words[0]} </h2>
                                        : <h2>{words[0]} department {words[1]}</h2>}

                                </>
                            }

                            <Button fieldClass="header-button"
                                    clickHandler={() => toggleMore(!more)}
                                    isDisabled={more}> See more <Goto className="go-icon"/>
                            </Button>

                            <div className='row'>
                                {currConditions &&
                                    <>
                                        <p> <span> {iconMapper(currConditions.WeatherIcon)}
                                        </span>
                                        </p>
                                        <h2><span
                                            className="big-tekst">{currConditions.Temperature.Metric.Value} </span> ° {currConditions.Temperature.Metric.Unit}
                                        </h2>
                                        <div className="conditions">
                                            <h2>  {currConditions.WeatherText} </h2>
                                            <h3>
                                                Realfeal <span>{currConditions.RealFeelTemperature.Metric.Value} </span> °{currConditions.RealFeelTemperature.Metric.Unit}
                                            </h3>
                                            <h4>
                                                <span>{currConditions.Wind.Direction.English} </span> {currConditions.Wind.Speed.Metric.Value} {currConditions.Wind.Speed.Metric.Unit}
                                            </h4>
                                            <h4>{currConditions.PrecipitationSummary.Precipitation.Metric.Value} {currConditions.PrecipitationSummary.Precipitation.Metric.Unit} </h4>
                                        </div>

                                    </>
                                }
                            </div>


                        </div>
                    </div>
                </div>
            </main>
            <main className="outer-container main-background">
                <div className="inner-container">

                    {(error !== '') &&
                        <span className="signal">  {error}, Something went wrong fetching the data  </span>
                    }
                    <div className="tiles">
                        <div className="tile">
                            {loading && <span>Loading...</span>}

                            <div className="currentconditions">

                                {currConditions &&
                                    <div className="column">
                                        <h3>Currently</h3>
                                        <br/>
                                        <h5>General</h5>
                                        <div className="row-wrap">
                                            <p> Sun (UV): {currConditions.UVIndexText} </p>
                                            <p> Visibility: {currConditions.Visibility.Metric.Value} {currConditions.Visibility.Metric.Unit}
                                            </p>
                                            <p> Wind-gusts: {currConditions.WindGust.Speed.Metric.Value} {currConditions.WindGust.Speed.Metric.Unit}</p>

                                        </div>

                                    </div>
                                }
                            </div>
                            {currConditions &&
                                <>
                                    <div className="currentconditions">
                                        <div>
                                            <div className="row-wrap">
                                                <p> Cloudcover: {currConditions.CloudCover} %</p>
                                                <p> Shade
                                                    feel: {currConditions.RealFeelTemperatureShade.Metric.Value} °{currConditions.RealFeelTemperature.Metric.Unit}
                                                </p>
                                                <p> Pressure {currConditions.PressureTendency.LocalizedText} {currConditions.Pressure.Metric.Value} {currConditions.Pressure.Metric.Unit} </p>
                                            </div>
                                            <br/>
                                            <h5>Precipitation</h5>
                                        </div>
                                    </div>

                                    <div className="row-wrap">

                                        <div className="precipitation small-text">

                                            <p> Past 1
                                                hour: {currConditions.Precip1hr.Metric.Value} {currConditions.Precip1hr.Metric.Unit} </p>
                                            <p> Past 6
                                                hours
                                                : {currConditions.PrecipitationSummary.Past6Hours.Metric.Value} {currConditions.PrecipitationSummary.Past6Hours.Metric.Unit} </p>
                                            <p> Past 12
                                                hours
                                                : {currConditions.PrecipitationSummary.Past12Hours.Metric.Value} {currConditions.PrecipitationSummary.Past12Hours.Metric.Unit} </p>
                                            <p> Past 24
                                                hours
                                                : {currConditions.PrecipitationSummary.Past24Hours.Metric.Value} {currConditions.PrecipitationSummary.Past24Hours.Metric.Unit} </p>
                                        </div>

                                        <div className="precipitation">
                                            {forecastData &&
                                                <>
                                                    {(forecastData.DailyForecasts.length > 0 && forecastData.DailyForecasts[0].Day.HasPrecipitation) ? <>
                                                            <h3> Forecasted for today: </h3>
                                                            <h4> {forecastData.DailyForecasts[0].Day.PrecipitationIntensity} {forecastData.DailyForecasts[0].Day.PrecipitationType},
                                                            </h4>
                                                            <p> probability: {forecastData.DailyForecasts[0].Day.PrecipitationProbability} %</p>
                                                            <p></p>
                                                        </>
                                                        : <p> Forecasted for today: 0 mm</p>}
                                                </>}
                                        </div>

                                    </div>
                                </>
                            }
                        </div>
                        <div className="tile">
                            {loading && <span>Loading...</span>}
                            <div className="forecast-header">
                                <h5>Forecast</h5>

                                <p></p>
                            </div>

                            {forecastData &&
                                <>
                                    {forecastData.DailyForecasts.length > 0 &&

                                        forecastData.DailyForecasts.map((forecastday) => {
                                            return <div className="forecast-line" key={forecastday.Date}>
                                                <div className="forecast-sub-line">


                                                    <div className="item">
                                                        <p>{makeDay(forecastday.EpochDate)}</p>
                                                        <p className="pictures"><span
                                                            className="small-span"> {iconMapper(forecastday.Day.Icon)} </span>
                                                        </p>
                                                        <p className="small-text">{forecastday.Day.IconPhrase}</p>
                                                    </div>
                                                </div>

                                                <div className="column">

                                                    <div className="compare-sub-header">
                                                        <span className="blank"></span>
                                                        <span className="item">Min/Max °C</span>
                                                        <span className="item">Rain/Snow mm</span>
                                                        <span className="item">Wind km/h</span>
                                                        <span className="item">Sun UV hrs</span>
                                                        <span className="item">Air quality</span>

                                                    </div>

                                                    <div className="forecast-sub-line">


                                                        <div className="forecast-item">
                                                            <span>{forecastday.Temperature.Minimum.Value.toFixed(0)}/{forecastday.Temperature.Maximum.Value.toFixed(0)}</span>
                                                        </div>
                                                        <div className="forecast-item">
                                                            <span>{forecastday.Day.Rain.Value.toFixed(0)}/{forecastday.Day.Snow.Value.toFixed(0)}</span>
                                                        </div>

                                                        <div className="forecast-item">
                                                    <span> {forecastday.Day.Wind.Direction.English}
                                                        {forecastday.Day.Wind.Speed.Value.toFixed(0)}/{forecastday.Day.WindGust.Speed.Value.toFixed(0)}</span>
                                                        </div>

                                                        <div className="forecast-item">

                                                            <span> {forecastday.AirAndPollen[5].Category} {forecastday.HoursOfSun} </span>
                                                        </div>
                                                        <div className="forecast-item">
                                                            <span>{forecastday.AirAndPollen[0].Category}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                        })


                                    }
                                </>
                            }


                        </div>
                    </div>
                </div>
            </main>
        </>

    )
        ;
}

export default Citydetails;