import React, {useEffect, useState} from 'react';
import ImgMapper from "../imgMapper";
import iconMapper from "../../helpers/iconMapper";
import './Article.css';
import fetchConditions from "../../helpers/fetchConditions"
import fetchLocationCity from "../../helpers/fetchLocationCity";
import test from "../../data/test.json";
import tslocation from "../../data/tslocation.json";
import LocMarker from "../locmarker/LocMarker";


function Article({tag, imagecode, region, city, department, departmentname}) {
    const [location, setLocation] = useState(null);
    const [marked, setMarked] = useState("white");
    const [checked, toggleChecked] = useState(false);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [currConditions, setCurrConditions] = useState(null);


    useEffect(() => {

        if (!location) {
            fetchLocationCity(city,  location, setLocation, error, toggleError, loading, toggleLoading);
            toggleLoading(false);
            // console.log(tslocation[0]);
            // setLocation(tslocation[0]);
        }

    }, []);

    useEffect(() => {

        if (!currConditions && location) {
            fetchConditions((location.Key), currConditions, setCurrConditions, error, toggleError, loading, toggleLoading);
            toggleLoading(false);
            // setCurrConditions(test[0]);
            // console.log(test[0]);
        }

    }, [location]);


    return (
        <>
            {/*{console.log('render', (currConditions), (location))}*/}
            <article className="card">

                {error &&
                    <span>  Something went wrong fetching the data  </span>
                }
                {loading && <span>Loading...</span>}
                <span className="tag">{tag}</span>
                <h1> {region} </h1>
                <h2> {city}
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