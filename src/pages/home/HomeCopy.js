import React, {useEffect, useState} from 'react';
import './Home.css';
import LocationItem from '../../components/locationItem/locationItem';
import axios from 'axios';

function Home() {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        async function fetchLocations() {

            const postcode = "01000"
            console.log('fetch')
            try {
                // const {data} = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/neighbors/146551?apikey=Jq0GXT92W5N47EvhMYKiHyXW6iJlKUIA&details=true`);
                //   const {data} = await axios.get(`https://dataservice.accuweather.com/locations/v1/adminareas/fr-36?apikey=iVlBSPKXxBblFMS3PQHkuUemNsAlPxlF&offset=1`);
                // const {data} = await axios.get(`https://dataservice.accuweather.com/locations/v1/postalcodes/fr/search?apikey=${process.env.REACT_APP_API_KEY}&q=${postcode}`);
                console.log((data[0]));
                setLocations((data));
            } catch (e) {
                console.error(e);
            }
        }

        fetchLocations();
    }, []);

    function doThingsOnClick() {
        console.log('Geliked!');
    }

    return (
        <div>

            <section className="outer-container main-nav-background">
                <div className="outer-row">
                    <div className="left-nav">
                        <span className="max">
                        <img className="icon-logo" src={logo} alt="Logo-weather-heights"/>
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
                            isDisabled={false}> <Search/> Zoek</Button>

                        <Favorite className="favorite-icon"/>

                    </div>
                </div>

            </section>

            <main className="outer-container main-header-background">
                <div className="inner-container">
                    <div className="mid">
                        <div className="header-content">
                            <h1>Weather Heights France</h1>
                            <p>Paris</p>
                            <p>Coordinates</p>
                            <Button fieldClass="header-button"
                                    clickHandler={() => console.log("Bekijken")}
                                    isDisabled={false}> Bekijken <Goto className="shop-icon"/></Button>
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

                </div>
            </main>
            <ul>
                {locations.length > 0 && locations.map((location) => {

                        return <LocationItem
                            key={location.key}
                            name={location.LocalizedName}

                            geopos={`${location.GeoPosition.Latitude} / ${location.GeoPosition.Longitude}`}
                            buttonType="button"
                            clickHandler={doThingsOnClick}
                        />

                })}
            </ul>
        </div>
    );
}

export default Home;