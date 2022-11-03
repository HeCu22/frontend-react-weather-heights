import React, {useEffect, useState} from 'react';
import {ReactComponent as Goto} from "../../assets/icons/go.svg";
import {ReactComponent as Back} from "../../assets/icons/back-arrow.svg";
import {ReactComponent as Forward} from "../../assets/icons/forward-arrow.svg";
import fetchLocationCity from "../../helpers/fetchLocationCity";
import fetchConditions from "../../helpers/fetchConditions";
import imConstruct from "../../helpers/imConstruct";
import regions from '../../data/regions.json';
import iconMapper from "../../helpers/iconMapper";
import Button from "../../components/button/Button";
import Article from "../../components/article/Article";
import tslocation from '../../data/tslocation.json';
import test from '../../data/test.json';
import './Home.css';
import axios from 'axios';
import Mainnav from "../../components/mainnav/Mainnav";

import fetchForecast from "../../helpers/fetchForecast";


function Home() {
    const [location, setLocation] = useState(null);
    const [currConditions, setCurrConditions] = useState(null);
    const [error, toggleError] = useState(false);

    regions.sort((a, b) => a.regioncapital - b.regioncapital);
    console.log(regions)


    useEffect(() => {
        if (!location) {
            fetchLocationCity("Paris",location,setLocation,error,toggleError);
            console.log(tslocation[0]);
            setLocation(tslocation[0]);

        } else {
            console.log('location', (location));
        }

    }, []);

    useEffect(() => {

        console.log('useeffecct2');


        if (!currConditions && location) {
            fetchConditions((location.Key), currConditions, setCurrConditions, error, toggleError)
            setCurrConditions(test[0]);
            console.log(test[0]);

        } else {
            console.log('currcond', (currConditions));
        }


    }, [location]);

    function doThingsOnClick() {
        console.log('Geliked!');
    }

    return (
        <>
            {console.log('render', (currConditions), (location))}
            {error &&

                <span>  Something went wrong fetching the data  </span>

            }

            <Mainnav/>


            <main className="outer-container main-header-background">
                <div className="inner-container">
                    <div className="mid">
                        <div className="header-content">
                            <h1>Weather Heights France</h1>
                            <h2>Paris</h2>

                            {location &&
                                <p><span
                                    className="small-text"> Coordinates: {location.GeoPosition.Latitude} / {location.GeoPosition.Longitude} </span>
                                </p>
                            }

                            <div className='row'>
                                {currConditions &&
                                    <>

                                        <p> {currConditions.WeatherText}
                                            <span>
                                                {iconMapper(currConditions.WeatherIcon)}
                                        </span>
                                        </p>

                                        <h2><span
                                            className="big-tekst">{currConditions.Temperature.Metric.Value} </span> ° {currConditions.Temperature.Metric.Unit}
                                        </h2>
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
                    <div className="cards">
                        <p>Regions</p>
                        <span><Back/> <Forward/></span>
                    </div>
                    <div className="outer-container main-background">
                        <div className="inner-container">

                            <div className="outer-row">

                                {regions.length > 0 && regions.map((region, index) => {

                                    if (index < 4) {

                                        return <Article key={region.code}
                                                        tag={region.code}
                                                        imagecode={imConstruct(region.regioncapital)}
                                                        region={region.name}
                                                        city={region.capital}
                                                        department={region.regioncapital}
                                                        departmentname={region.regionname}
                                        />
                                    }
                                })}
                            </div>
                        </div>
                    </div>

                </div>
            </main>
            <ul>

            </ul>
        </>
    );
}

export default Home;