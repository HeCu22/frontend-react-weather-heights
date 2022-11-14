import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import ImgMapper from "../imgMapper";
import iconMapper from "../../helpers/iconMapper";
import './Article.css';
import fetchConditions from "../../helpers/fetchConditions"
import fetchLocationCity from "../../helpers/fetchLocationCity";
import test from "../../data/test.json";
import tslocation from "../../data/tslocation.json";
import LocMarker from "../locmarker/LocMarker";


function Article({tag, imagecode, region, city, department, departmentname, more}) {
    const [location, setLocation] = useState(null);
    const [marked, setMarked] = useState("white");
    const [checked, toggleChecked] = useState(false);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [currConditions, setCurrConditions] = useState(null);


    useEffect(() => {

        if (!location) {
            fetchLocationCity(city.concat(',', department), location, setLocation, error, toggleError, loading, toggleLoading);
            toggleLoading(false);
            setLocation(tslocation[0]);
        }

    }, []);

    useEffect(() => {

        if (more && !currConditions && location) {
            fetchConditions((location.Key), currConditions, setCurrConditions, error, toggleError, loading, toggleLoading);
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
                <h2><Link to={`/details/${city},${department}`} > {city} </Link>
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

                </div>
                {currConditions &&
                    <>
                        <h4>
                            <span>{currConditions.Wind.Direction.English} </span> {currConditions.Wind.Speed.Metric.Value}

                        </h4>
                        <h3>{currConditions.PrecipitationSummary.Past6Hours.Metric.value}</h3>
                    </>
                }

                <p><span>{department} {departmentname} </span></p>
            </article>
        </>
    );
}

export default Article;