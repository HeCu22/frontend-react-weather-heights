import React, {useContext, useEffect, useState} from 'react';
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
import {AuthContext} from "../../context/AuthContext";

import tslocation from '../../data/tslocation.json';
import test from '../../data/test.json';
import './Home.css';

import Mainnav from "../../components/mainnav/Mainnav";
import {Link, useHistory} from "react-router-dom";
import LocMarker from "../../components/locmarker/LocMarker";


function Home() {
    const history = useHistory();
    const {isAuthenticated, userLogoutFunction, email} = useContext(AuthContext);
    const [more, toggleMore] = useState(false);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);


    regions.sort((a, b) => a.regioncapital - b.regioncapital);



    return (
        <>

            {error &&
                <span>  Something went wrong fetching the data  </span>
            }
            {loading && <span>Loading...</span>}
            <Mainnav>
                <ul className="outer-row">
                    <li> France</li>
                    <li><Link to="/"> Regions</Link></li>
                    <li><Link to="/"> Departments </Link></li>
                    {isAuthenticated &&
                        <li><Link to="/"> MyLocations </Link></li>
                    }
                    <li><Link to="/"> Cities </Link></li>

                </ul>

            </Mainnav>


            <main className="outer-container main-header-background">
                <div className="inner-container">
                    <div className="mid">

                        <div className="header-content">
                            <h1>Weather Heights France </h1>
                            <div className="outer-row">
                                <Article
                                    fieldClass="top-card"
                                    pictureClass="mid-picture-span"
                                    imagecode="im75"
                                    city="Paris"
                                    locationKey="623"
                                    department="75"
                                    more={more}
                                />


                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <main className="outer-container main-background">
                <div className="inner-container">
                    <div className="cards">
                        <p>Regions</p>
                        <div className="cards-mid-content">
                            <Button fieldClass="cards-button"
                                    clickHandler={() => toggleMore(!more)}
                                    isDisabled={false}> see also current weather of capitals below... </Button>
                        </div>
                        <span><Back/> <Forward/></span>
                    </div>
                    <div className="outer-container main-background">
                        <div className="inner-container">

                            <div className="outer-row">

                                {regions.length > 0 && regions.map((region, index) => {

                                    if (index < 99) {
                                        return <Article key={region.code}
                                                        fieldClass="card"
                                                        pictureClass="small-picture-span"
                                                        tag={region.code}
                                                        imagecode={imConstruct(region.code)}
                                                        locationKey={region.key}
                                                        region={region.name}
                                                        city={region.capital}
                                                        department={region.regioncapital}
                                                        departmentname={region.regionname}
                                                        more={more}
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