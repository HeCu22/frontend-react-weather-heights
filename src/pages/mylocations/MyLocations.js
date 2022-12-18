import React, {useContext, useState} from 'react';
import {ReactComponent as Back} from "../../assets/icons/back-arrow.svg";
import {ReactComponent as Forward} from "../../assets/icons/forward-arrow.svg";

import Button from "../../components/button/Button";
import Article from "../../components/article/Article";
import {AuthContext} from "../../context/AuthContext";
import {LocContext} from "../../context/LocContext";

import Mainnav from "../../components/mainnav/Mainnav";
import {Link} from "react-router-dom";

import './MyLocations.css';

function MyLocations(props) {
    console.log('mylocations to be defined');
    const {isAuthenticated, userLogoutFunction, email} = useContext(AuthContext);
    const {favLocations, setFavLocFunction} = useContext(LocContext);
    const [more, toggleMore] = useState(false);
    const [error, setError] = useState('');
    const [loading, toggleLoading] = useState(false);

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
                    <li> MyLocations</li>
                    {isAuthenticated &&
                        <li><Link to="/"> Compare </Link></li>
                    }
                    <li> Overview</li>
                    {isAuthenticated &&
                        <li><Link to="/"> Grid </Link></li>
                    }
                </ul>

            </Mainnav>

            <main className="outer-container main-background">
                <div className="inner-container">
                    <div className="cards">
                        <p>MyLocations</p>
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

                                {favLocations.length > 0 && favLocations.map((favLoc, index) => {

                                    if (favLoc.key > "" && index < 10) {

                                        return <Article key={favLoc.key}
                                                        fieldClass="card"
                                                        pictureClass="small-picture-span"
                                                        locationKey={favLoc.key}
                                                        city={favLoc.city}
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

export default MyLocations;