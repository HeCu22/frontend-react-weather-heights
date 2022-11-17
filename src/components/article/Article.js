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



function Article({tag, imagecode, locationKey, region, city, department, departmentname, more}) {
    const [location, setLocation] = useState(null);
    const [marked, setMarked] = useState("white");
    const [checked, toggleChecked] = useState(false);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [currConditions, setCurrConditions] = useState(null);


    useEffect(() => {

        if (locationKey) {
            console.log('locationKey');
            //      fetchLocationData(locationKey,location,setLocation,error, toggleError, loading, toggleLoading) ;
            setLocation(tslocation[0]);
            toggleLoading(false);
        } else {
            if (!location && city) {
                //        fetchLocationCity(city.concat(',', department), location, setLocation, error, toggleError, loading, toggleLoading);
                toggleLoading(false);
                setLocation(tslocation[0]);
            } else {
                if (!location && !city) {
                    //          fetchLocationPC(department, location, setLocation, error, toggleError, loading, toggleLoading);
                    toggleLoading(false);
                    setLocation(tslocation[0]);

                }
            }
        }

    }, []);

    useEffect(() => {

        if (more && !currConditions && location) {
            // fetchConditions((location.Key), currConditions, setCurrConditions, error, toggleError, loading, toggleLoading);
            toggleLoading(false);
            setCurrConditions(test[0]);

        }

    }, [more, location]);


    return (
        <>
            {/*{console.log('render', (currConditions), (location))}*/}
            <article className="card">

                {loading && <span>Loading...</span>}
                <span className="tag">{tag}</span>
                <h1> {region} </h1>
                {city ?
                    <h2><Link to={`/details/${city},${department}`}> {city} </Link>
                        {location &&
                            <LocMarker
                                checked={checked}
                                toggleChecked={toggleChecked}
                                marked={marked}
                                setMarked={setMarked}
                                locationKey={location.Key}
                            />
                        }
                    </h2>
                    :
                    <>
                        {location &&
                            <h2><Link
                                to={`/details/${location.EnglishName},${department}`}> {location.EnglishName} </Link>
                                {location &&
                                    <LocMarker
                                        checked={checked}
                                        toggleChecked={toggleChecked}
                                        marked={marked}
                                        setMarked={setMarked}
                                        locationKey={location.Key}
                                    />
                                }
                            </h2>
                        }
                    </>
                }
                {location &&
                    <h3><span
                        className="small-text"> {location.GeoPosition.Latitude} / {location.GeoPosition.Longitude} </span>
                    </h3>
                }
                {currConditions &&
                    <>
                        <h2>
                            {iconMapper(currConditions.WeatherIcon)}

                            <span>{currConditions.Temperature.Metric.Value} </span> ° {currConditions.Temperature.Metric.Unit}
                        </h2>
                    </>
                }
                <div className="pictures">
                    <span className="small-picture-span">
                        <ImgMapper
                            imCode={imagecode}
                            department={departmentname}/>
                    </span>

                    {currConditions &&
                        <>
                            <h4 className="row">
                                <span>{currConditions.Wind.Direction.English} {currConditions.Wind.Speed.Metric.Value} </span>
                                <span> {currConditions.PrecipitationSummary.Precipitation.Metric.Value}{currConditions.PrecipitationSummary.Precipitation.Metric.Unit} </span>
                            </h4>
                        </>
                    }
                </div>
                {/* search was done via locationKey */}
                {(locationKey && location) &&
                    <p><Link to={`/departments/${location.AdministrativeArea.ID}`}> {location.AdministrativeArea.ID} </Link>
                        <span> {location.AdministrativeArea.EnglishName} </span>
                    </p>
                }
                {/* search was done via city name */}
                {city &&
                    <p><Link to={`/departments/${department}`}> {department} </Link>
                        <span> {departmentname} </span>
                    </p>
                }
                {/* search was done via postalcode */}
                {(!city && location) &&
                    <p><span
                        className="small-text"> Arrondissement: {location.SupplementalAdminAreas[0].EnglishName} </span>
                    </p>
                }
            </article>
        </>
    );
}

export default Article;