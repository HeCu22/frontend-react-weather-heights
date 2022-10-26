import React, {useEffect, useState} from 'react';
import {ReactComponent as Logo} from "../../assets/logo-weather-heights.svg";
import {ReactComponent as Goto} from "../../assets/go.svg";
import {ReactComponent as Back} from "../../assets/back-arrow.svg";
import {ReactComponent as Forward} from "../../assets/forward-arrow.svg";
import {ReactComponent as Search} from "../../assets/search.svg";
import {ReactComponent as Favorite} from "../../assets/star.svg"
import {ReactComponent as Weathericon6} from "../../assets/weather-icon6.svg";
import im13 from "../../assets/images/impression13.jpg";
import regions from '../../data/regions.json';

import Button from "../../components/button/Button";
import Article from "../../components/article/Article";
import './Home.css';
import LocationItem from '../../components/locationItem/locationItem';
import axios from 'axios';

function Home() {
    const [location, setLocation] = useState(null);
    const [currConditions, setCurrConditions] = useState(null);

    regions.sort((a, b) => a.regioncapital - b.regioncapital);
    console.log(regions);

    async function fetchLocation() {
        const postcode = "01000"
        console.log('fetchloc')
        try {
            // const {data} = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/neighbors/146551?apikey=${process.env.REACT_APP_API_KEY}&details=true`);
            //   const {data} = await axios.get(`https://dataservice.accuweather.com/locations/v1/adminareas/fr-36?apikey=${process.env.REACT_APP_API_KEY}&offset=1`);
            //       const {data} = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/623?apikey=${process.env.REACT_APP_API_KEY}`);
            const {data: [data]} = await axios.get(`https://dataservice.accuweather.com/locations/v1/search?q=paris,FR&apikey=Jq0GXT92W5N47EvhMYKiHyXW6iJlKUIA&offset=1`);
            console.log((data));
            setLocation((data));
        } catch (e) {
            console.error(e);
        }
    }

    async function fetchConditions() {

        console.log('fetchcond')
        try {

            const {data: [data]} = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/623?apikey=Jq0GXT92W5N47EvhMYKiHyXW6iJlKUIA`);

            console.log((data));
            setCurrConditions((data));
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
        if (!currConditions) {
            fetchConditions()
        } else {
            console.log('currcond', (currConditions));
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

                                        <p> {currConditions.WeatherText}</p>
                                        <Weathericon6/>
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
                                {regions.map((region) => {
                                    return <Article key={region.code}
                                                    tag={region.code}
                                                    image={im13}
                                                    title={region.regioncapital}
                                                    description={region.name}
                                    />
                                })}S
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