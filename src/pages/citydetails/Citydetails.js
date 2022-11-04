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

function Citydetails(props) {
    const {city} = useParams();

    const [background, setBackground] = useState("outer-container main-header-background");
    const [location, setLocation] = useState(null);
    const [currConditions, setCurrConditions] = useState(null);
    const [forecastData, setForecastData] = useState(null)
    const [error, toggleError] = useState(false);
    const [errorFc, toggleErrorFc] = useState(false);
    const [loading,toggleLoading] = useState(false);

    useEffect(() => {

        console.log('useeffecct');

        if (!location) {
            fetchLocationCity((city), location, setLocation, error, toggleError,loading,toggleLoading);
            toggleLoading(false);
            setBackground("outer-container impression01");


        //    console.log(tslocation[0]);
        //    setLocation(tslocation[0]);

        } else {
            console.log('location', (location));

        }


    }, []);

    useEffect(() => {

        console.log('useeffecct2');


        if (!currConditions && location) {
            fetchConditions((location.Key), currConditions, setCurrConditions, error, toggleError,loading,toggleLoading);
            toggleLoading(false);
     //       setCurrConditions(test[0]);
     //      console.log(test[0]);

            if (!forecastData && location) {
                fetchForecast((location.Key), forecastData, setForecastData, errorFc, toggleErrorFc,loading,toggleLoading);
                toggleLoading(false);
     //           setForecastData(tsforecast[0]);
      //          console.log('forecast', tsforecast[0]);

            } else {
                console.log('forecast', (forecastData));
            }

        } else {
            console.log('currcond', (currConditions));
        }


    }, [location]);

    return (
        <>
            {console.log('render', (currConditions), (location), (forecastData))}
            {error &&
                <span>  Something went wrong fetching the data  </span>
            }
            {loading && <span>Loading...</span>}
            <main className={background}>
                <div className="inner-container">
                    <div className="mid">
                        <div className="header-content">
                            {location &&
                                <>
                                    <h1>Weather Heights France {location.AdministrativeArea.EnglishName}</h1>
                                    <h2>{city}</h2>
                                    <p><span
                                        className="small-text"> Coordinates: {location.GeoPosition.Latitude} / {location.GeoPosition.Longitude} </span>
                                    </p>
                                </>
                            }

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
                                            <h4>{currConditions.PrecipitationSummary.Past6Hours.Metric.Value} {currConditions.PrecipitationSummary.Past6Hours.Metric.Unit} </h4>
                                        </div>

                                    </>
                                }
                            </div>

                            <Button fieldClass="header-button"
                                    clickHandler={() => console.log("See more")}
                                    isDisabled={false}> See more <Goto className="search-icon"/></Button>
                        </div>
                    </div>
                </div>
            </main>
            <main className="outer-container main-background">
                <div className="inner-container">
                    <div className="outer-row">
                        <div className="tile">

                            <div className="currentconditions">
                                {error &&
                                    <span>  Something went wrong fetching the data  </span>
                                }
                                {loading && <span>Loading...</span>}
                                <h5>Currently</h5>
                                {currConditions &&
                                    <>
                                        <p> Sun (UV): {currConditions.UVIndex} {currConditions.UVIndexText}
                                        </p>
                                        <p> Visibility: {currConditions.Visibility.Metric.Value} {currConditions.Visibility.Metric.Unit}
                                        </p>
                                        <p> Wind
                                            gusts: {currConditions.WindGust.Speed.Metric.Value} {currConditions.WindGust.Speed.Metric.Unit}</p>
                                    </>
                                }
                            </div>
                            {currConditions &&
                                <>
                                    <div className="currentconditions">
                                        <p> Cloudcover: {currConditions.CloudCover} %</p>
                                        <p> Shade
                                            feel: <span>{currConditions.RealFeelTemperatureShade.Metric.Value} </span> °{currConditions.RealFeelTemperature.Metric.Unit}
                                        </p>
                                        <p> Pressure: <span>{currConditions.PressureTendency.LocalizedText} </span>
                                        </p>
                                        <p>
                                            {currConditions.Pressure.Metric.Value} {currConditions.Pressure.Metric.Unit} </p>


                                    </div>
                                    <div className="rain">
                                        <br></br>
                                        <p> Rain precipitation 1
                                            hour: {currConditions.Precip1hr.Metric.Value} {currConditions.Precip1hr.Metric.Unit} </p>
                                        <p> Rain past
                                            hour
                                            : {currConditions.PrecipitationSummary.PastHour.Metric.Value} {currConditions.PrecipitationSummary.PastHour.Metric.Unit} </p>
                                        <p> Rain past 3
                                            hours: {currConditions.PrecipitationSummary.Past3Hours.Metric.Value} {currConditions.PrecipitationSummary.Past3Hours.Metric.Unit} </p>

                                        <p> Rain past 6
                                            hours: {currConditions.PrecipitationSummary.Past6Hours.Metric.Value} {currConditions.PrecipitationSummary.Past6Hours.Metric.Unit} </p>
                                        <p> Rain past 9
                                            hours: {currConditions.PrecipitationSummary.Past9Hours.Metric.Value} {currConditions.PrecipitationSummary.Past9Hours.Metric.Unit} </p>
                                        <p> Rain past 12
                                            hours: {currConditions.PrecipitationSummary.Past12Hours.Metric.Value} {currConditions.PrecipitationSummary.Past12Hours.Metric.Unit} </p>
                                        <p> Rain past 18
                                            hours: {currConditions.PrecipitationSummary.Past18Hours.Metric.Value} {currConditions.PrecipitationSummary.Past18Hours.Metric.Unit} </p>
                                        <p> Rain past 24
                                            hours: {currConditions.PrecipitationSummary.Past24Hours.Metric.Value} {currConditions.PrecipitationSummary.Past24Hours.Metric.Unit} </p>
                                    </div>
                                </>
                            }
                        </div>
                        <div className="tile">
                            {errorFc &&
                                <span>  Something went wrong fetching the data  </span>
                            }
                            {loading && <span>Loading...</span>}
                            <div className="forecast-header">
                                <h5>Forecast</h5>
                                <p>Min/Max °C</p>
                                <p>Rain mm</p>
                                <p>Wind km/h</p>
                                <p>Sun hrs UV</p>
                                <p>Air quality</p>

                            </div>

                            {forecastData &&
                                <>
                                    {forecastData.DailyForecasts.length > 0 &&

                                        forecastData.DailyForecasts.map((forecastday) => {
                                            return <div className="forecastline" key={forecastday.Date}>
                                                <p>{makeDay(forecastday.EpochDate)}</p>
                                                <p className="pictures"> <span className="small-picture-span"> {iconMapper(forecastday.Day.Icon)} </span></p>
                                                <p className="small-text">{forecastday.Day.IconPhrase}</p>
                                                <p>{forecastday.Temperature.Minimum.Value}/{forecastday.Temperature.Maximum.Value}</p>
                                                <p>{forecastday.Day.Rain.Value}</p>
                                                <p>{forecastday.Day.Wind.Direction.English} {forecastday.Day.Wind.Speed.Value}/{forecastday.Day.WindGust.Speed.Value}</p>
                                                <p>{forecastday.HoursOfSun} {forecastday.AirAndPollen[5].Category} </p>
                                                <p>{forecastday.AirAndPollen[0].Category}</p>
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