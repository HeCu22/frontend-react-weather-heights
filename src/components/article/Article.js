import React, {useEffect, useState} from 'react';
import axios from "axios";
import ImgMapper from "../imgMapper";
import iconMapper from "../../helpers/iconMapper";
import './Article.css';
import fetchConditions from "../../helpers/fetchConditions"
import fetchLocationKey from "../../helpers/fetchLocactionKey";
import fetchLocationCity from "../../helpers/fetchLocationCity";



function Article({tag, imagecode, region, city, department, departmentname}) {
    console.log('tag', tag, city);
    const [location,setLocation] = useState(null);

    const [currConditions, setCurrConditions] = useState(null);

    useEffect(() => {

        if (!currConditions) {
            fetchLocationCity(city,currConditions,setCurrConditions,location,setLocation)
        } else {
            console.log('currcond', (currConditions));
        }

    }, []);


    return (
        <article className="card">
            <span className="tag">{tag}</span>
            <h1> {region} </h1>
            <h2> {city} </h2>
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
                    <h2>
                        <span>{currConditions.Wind.Direction.English} </span> {currConditions.Wind.Speed.Metric.Value}

                    </h2>
                    <h3>{currConditions.PrecipitationSummary.Past6Hours.Metric.value}</h3>
                </>
            }

            <p><span>{department} {departmentname} </span> </p>
        </article>
    );
}

export default Article;