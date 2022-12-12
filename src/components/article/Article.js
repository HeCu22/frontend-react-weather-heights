import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import ImgMapper from "../imgMapper";
import iconMapper from "../../helpers/iconMapper";
import './Article.css';
import fetchConditions from "../../helpers/fetchConditions"
import fetchLocationCity from "../../helpers/fetchLocationCity";
import fetchLocationPC from "../../helpers/fetchLocactionPC";
import fetchLocationData from "../../helpers/fetchLocationData";
import test from "../../data/test.json";
import tslocation from "../../data/tslocation.json";
import LocMarker from "../locmarker/LocMarker";


function Article({  fieldClass,
                     pictureClass,
                     tag,
                     imagecode,
                     locationKey,
                     region,
                     city,
                     department,
                     departmentname,
                     more
                 }) {
    const [location, setLocation] = useState(null);
    const [marked, setMarked] = useState("white");
    const [checked, toggleChecked] = useState(false);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [currConditions, setCurrConditions] = useState(null);
    console.log('article props', tag,
        imagecode,
        locationKey,
        region,
        city,
        department,
        departmentname);

    useEffect(() => {
        console.log('useeffect mount')
        if (locationKey) {
            console.log('locationKey', locationKey);
            if (more) {
                // fetchLocationData(locationKey, location, setLocation, error, toggleError, loading, toggleLoading);
                setLocation(tslocation[1]);
                toggleLoading(false);
            }
        } else {
            if (!location && city) {
                if (more) {
                    // fetchLocationCity(city.concat(',', department), location, setLocation, error, toggleError, loading, toggleLoading);
                    setLocation(tslocation[0]);
                    toggleLoading(false);
                }

            } else {
                if (!location && !city) {
                    if (more) {
                        // fetchLocationPC(department, location, setLocation, error, toggleError, loading, toggleLoading);
                        setLocation(tslocation[0]);
                        toggleLoading(false);
                    }
                }
            }
        }

    }, []);

    useEffect(() => {
        console.log('useeffect update more', location, currConditions);
        if (more && !location && city) {
                // fetchLocationCity(city.concat(',', department), location, setLocation, error, toggleError, loading, toggleLoading);
                setLocation(tslocation[0]);
                toggleLoading(false);
            }
        if (more && !currConditions && location) {
            // fetchConditions((location.Key), currConditions, setCurrConditions, error, toggleError, loading, toggleLoading);
            console.log('Loc more');
            setCurrConditions(test[0]);
            toggleLoading(false);

        }

    }, [more, location]);


    return (
        <>

            {console.log('render', (currConditions), (location))}
            <article className={fieldClass}>
                {error &&
                    <span>  Something went wrong fetching the data  </span>
                }

                {loading && <span>Loading...</span>}
                <span className="tag">{tag}</span>
                <h1> {region} </h1>
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
                {(locationKey && location &&!city) &&
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
                {(!city && location.includes("_PC")) &&
                    <p><span
                        className="small-text"> {department} {departmentname} ,Arrondissement: {location.SupplementalAdminAreas[0].EnglishName} </span>

                    </p>
                }
            </article>
        </>
    );
}

export default Article;