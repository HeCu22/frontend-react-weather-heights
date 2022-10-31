import React, {useEffect, useState} from 'react';
import {ReactComponent as Logo} from "../../assets/icons/logo-weather-heights.svg";
import {ReactComponent as Goto} from "../../assets/icons/go.svg";
import {ReactComponent as Back} from "../../assets/icons/back-arrow.svg";
import {ReactComponent as Forward} from "../../assets/icons/forward-arrow.svg";
import {ReactComponent as Search} from "../../assets/icons/search.svg";
import {ReactComponent as Favorite} from "../../assets/icons/star.svg";

import fetchConditions from "../../helpers/fetchConditions";
import imConstruct from "../../helpers/imConstruct";
import regions from '../../data/regions.json';
import iconMapper from "../../helpers/iconMapper";
import Button from "../../components/button/Button";
import Article from "../../components/article/Article";
import './Home.css';
import LocationItem from '../../components/locationItem/locationItem';
import axios from 'axios';
import IconMapper from "../../helpers/iconMapper";

function Home() {
    const [location, setLocation] = useState(null);
    const [currConditions, setCurrConditions] = useState(null);


    regions.sort((a, b) => a.regioncapital - b.regioncapital);
    console.log(regions)


   async function fetchLocation() {

        console.log(' Paris')
        try {
            // const {data} = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/neighbors/146551?apikey=${process.env.REACT_APP_API_KEY}&details=true`);
            //   const {data} = await axios.get(`https://dataservice.accuweather.com/locations/v1/adminareas/fr-36?apikey=${process.env.REACT_APP_API_KEY}&offset=1`);
            //       const {data} = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/623?apikey=${process.env.REACT_APP_API_KEY}`);
            const {data: [data]} = await axios.get(`https://dataservice.accuweather.com/locations/v1/search?q=paris,FR&apikey=${process.env.REACT_APP_API_KEY}&offset=1`);
            console.log((data), (data.Key));
            setLocation((data));


            if (!currConditions) {
                fetchConditions((data.Key), currConditions, setCurrConditions)
            } else {
                console.log('currcond', (currConditions));
            }

        } catch (e) {
            console.error(e);
        }
    }


    useEffect(() => {
        if (!location) {
            fetchLocation();

        } else {
            console.log('location', (location));
        }

    }, []);

    function doThingsOnClick() {
        console.log('Geliked!');
    }

    return (
        <>

            <div className="outer-container main-nav-background">
                <div className="outer-row">
                    <div className="left-nav">
                        <span className="max">
                        <Logo className="icon-logo"/>
                        </span>
                    </div>
                    <div className="mid-nav">
                        <ul className="outer-row">
                            <li>France</li>
                            <li>Regions</li>
                            <li>Departments</li>
                            <li>Cities</li>
                        </ul>
                    </div>
                    <div className="right-nav">
                        <Button
                            clickHandler={() => console.log("Find")}
                            isDisabled={false}> <Search/> city</Button>

                        <Favorite className="favorite-icon"/>

                    </div>
                </div>

            </div>

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
            <main className="outer-container main-nav-background">
                <div className="inner-container">
                    <div className="cards">
                        <p>Regions</p>
                        <span><Back/> <Forward/></span>
                    </div>
                    <div className="outer-container main-nav-background">
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