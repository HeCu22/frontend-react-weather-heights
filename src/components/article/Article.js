import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import ImgMapper from "../imgMapper";
import iconMapper from "../../helpers/iconMapper";
import './Article.css';
import fetchConditions from "../../helpers/fetchConditions"
import fetchLocationCity from "../../helpers/fetchLocationCity";
import fetchLocationData from "../../helpers/fetchLocationData";
import test from "../../data/test.json";
import tslocation from "../../data/tslocation.json";
import LocMarker from "../locmarker/LocMarker";
import CounterResult from "../CounterResult";

function Article({
                     fieldClass,
                     pictureClass,
                     tag,
                     imagecode,
                     locationKey,
                     region,
                     city,
                     department,
                     departmentname,
                     more,
                     error,
                     setError,
                     counter, setCounter
                 }) {
    const [location, setLocation] = useState(null);
    const [marked, setMarked] = useState("white");
    const [checked, toggleChecked] = useState(false);

    const [loading, toggleLoading] = useState(false);
    const [currConditions, setCurrConditions] = useState(null)
    let teller = counter;

    useEffect(() => {
        // lees alleen location data bij de eerste  keer
        if (more && locationKey) {
            fetchLocationData(locationKey, location, setLocation, error, setError, loading, toggleLoading);
            // setLocation(tslocation[1]);
            teller = teller + 1;
        } else {
            if (more && !location && city) {
                fetchLocationCity(city.concat(',', department), location, setLocation, error, setError, loading, toggleLoading);
                // setLocation(tslocation[0])
                teller = teller + 1;
            }
        }

        setCounter(teller)

    }, []);

    useEffect(() => {
        // lees weerdata zodra location data gelezen en in state
        if (more && !currConditions && location) {
            fetchConditions((location.Key), currConditions, setCurrConditions, error, setError, loading, toggleLoading);
            // setCurrConditions(test[0])
            teller = teller + 1;
        }
        setCounter(teller);
    }, [location]);


    return (
        <>

            <article className={fieldClass}>


                {loading && <span>Loading...</span>}
                <span className="tag">{tag}</span>
                <h1> {region} </h1>
                {/*// indien gelezen via city*/}
                {city ?
                    <h2><Link to={`/details/${city},${department}`}> {city} </Link>
                        {locationKey &&

                            <>

                                <LocMarker
                                    key={locationKey}
                                    checked={checked}
                                    toggleChecked={toggleChecked}
                                    marked={marked}
                                    setMarked={setMarked}
                                    locationKey={locationKey}
                                    cityName={city}
                                />
                            </>
                        }

                        {(!locationKey && location) &&
                            <>

                                <LocMarker
                                    key={locationKey}
                                    checked={checked}
                                    toggleChecked={toggleChecked}
                                    marked={marked}
                                    setMarked={setMarked}
                                    locationKey={location.Key}
                                    cityName={city}
                                />
                            </>
                        }

                    </h2>
                    :
                    <>
                        {location &&
                            <>

                                <h2><Link
                                    to={`/details/${location.EnglishName},${department}`}> {location.EnglishName} </Link>
                                    {location &&
                                        <LocMarker
                                            key={location.Key}
                                            checked={checked}
                                            toggleChecked={toggleChecked}
                                            marked={marked}
                                            setMarked={setMarked}
                                            locationKey={location.Key}
                                            cityName={location.EnglishName}

                                        />
                                    }
                                </h2>
                            </>
                        }
                    </>
                }
                {location &&
                    <h3><span
                        className="small-text"> {location.GeoPosition.Latitude.toFixed(2)} / {location.GeoPosition.Longitude.toFixed(2)} </span>
                    </h3>
                }
                {currConditions &&
                    <>
                        <h2 className="weather-detail">
                            {iconMapper(currConditions.WeatherIcon)}

                            <span>{currConditions.Temperature.Metric.Value} </span> ° {currConditions.Temperature.Metric.Unit}
                        </h2>
                    </>
                }
                <div className="pictures">
                    <span className={pictureClass}>
                        <ImgMapper
                            imCode={imagecode}
                            department={departmentname}/>
                    </span>

                    {currConditions &&
                        <>
                            <h4 className="column weather-detail">
                                <span>{currConditions.Wind.Direction.English}{currConditions.Wind.Speed.Metric.Value} </span>
                                <span> {currConditions.PrecipitationSummary.Precipitation.Metric.Value}{currConditions.PrecipitationSummary.Precipitation.Metric.Unit} </span>
                            </h4>
                        </>
                    }
                </div>
                {/* search was done via locationKey */}
                {(locationKey && location && !city) &&
                    <p>
                        <Link
                            to={`/departments/${location.AdministrativeArea.ID}`}> {location.AdministrativeArea.ID} </Link>
                        <span> {location.AdministrativeArea.EnglishName} </span>
                    </p>
                }
                {/* search was done via city name */}
                {city &&
                    <p>
                        <Link to={`/departments/${department}`}> {department} </Link>
                        <span> {departmentname} </span>
                    </p>
                }
                {/* search was done via postalcode */}
                {(!city && locationKey.includes("_PC")) &&
                    <p><span
                        className="small-text"> {department} {departmentname} ,Arrondissement: {location.SupplementalAdminAreas[0].EnglishName} </span>

                    </p>
                }
            </article>
        </>
    );
}

export default Article;