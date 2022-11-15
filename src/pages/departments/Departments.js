import React, {useContext, useEffect, useState} from 'react';
import {ReactComponent as Goto} from "../../assets/icons/go.svg";
import {ReactComponent as Back} from "../../assets/icons/back-arrow.svg";
import {ReactComponent as Forward} from "../../assets/icons/forward-arrow.svg";
import fetchLocationKey from "../../helpers/fetchLocactionKey";
import fetchConditions from "../../helpers/fetchConditions";
import imConstruct from "../../helpers/imConstruct";
import departments from '../../data/departments.json';
import iconMapper from "../../helpers/iconMapper";
import Button from "../../components/button/Button";
import Article from "../../components/article/Article";
import {AuthContext} from "../../context/AuthContext";

import tslocation from '../../data/tslocation.json';
import test from '../../data/test.json';
import './Departments.css';
import Mainnav from "../../components/mainnav/Mainnav";
import {Link, useHistory, useParams} from "react-router-dom";
import LocMarker from "../../components/locmarker/LocMarker";


function Departments(props) {
    const {department} = useParams();
    const history = useHistory();
    const {isAuthenticated, userLogoutFunction, email} = useContext(AuthContext);
    const [background, setBackground] = useState("outer-container main-header-background");
    const [location, setLocation] = useState(null);
    const [currConditions, setCurrConditions] = useState(null);
    const [more, toggleMore] = useState(false);
    const [marked, setMarked] = useState("white");
    const [checked, toggleChecked] = useState(false);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    const string = "".concat("FR-",department);
    const region = departments.find((departfound) => {
        return departfound.code === string
        }
    )


    const regionDepartments =  departments.filter((regionDepartment) => {
        return regionDepartment.parent === region.parent
    })

    console.log(regionDepartments.length);


    useEffect(() => {
        if (!location) {
            fetchLocationKey(department, location, setLocation, error, toggleError, loading, toggleLoading);
            toggleLoading(false);
            setBackground("outer-container impression13");
            // setLocation(tslocation[0]);
        }
    }, []);

    useEffect(() => {

        console.log('useffect update');


        if (!currConditions && location) {
            fetchConditions((location.Key), currConditions, setCurrConditions, error, toggleError, loading, toggleLoading)
            toggleLoading(false);
            // setCurrConditions(test[0]);

        }


    }, [location]);


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


            <main className={background}>
                <div className="inner-container">
                    <div className="mid">

                        <div className="header-content">
                            <h1>Weather Heights France </h1>
                            <div className="outer-row">
                                <div>
                                    {location &&
                                    <h2>{location.EnglishName}

                                            <LocMarker
                                                checked={checked}
                                                toggleChecked={toggleChecked}
                                                marked={marked}
                                                setMarked={setMarked}
                                                locationKey={location.Key}
                                            />


                                    </h2>
                                    }

                                    {location &&
                                        <p><span
                                            className="small-text"> Coordinates: {location.GeoPosition.Latitude} / {location.GeoPosition.Longitude} </span>
                                        </p>
                                    }

                                    <div className='row'>
                                        {currConditions &&
                                            <> <p> {currConditions.WeatherText}
                                                <span> {iconMapper(currConditions.WeatherIcon)}
                                        </span>
                                            </p>

                                                <h2><span
                                                    className="big-tekst">{currConditions.Temperature.Metric.Value} </span> ° {currConditions.Temperature.Metric.Unit}
                                                </h2>
                                            </>
                                        }
                                    </div>

                                    <Button fieldClass="header-button"
                                            clickHandler={() => history.push(`/details/Paris`)}
                                            isDisabled={false}> details <Goto className="search-icon"/></Button>
                                </div>

                                <div>
                                    <h2><span className="invitation-tekst"> Mark ten locations in France as your favorite and login to compare</span>
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <main className="outer-container main-background">
                <div className="inner-container">
                    <div className="cards">
                        <p>Departments</p>
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

                                {regionDepartments.length > 0 && regionDepartments.map((regDep, index) => {

                                    if (index < 4) {

                                        return <Article key={regDep.code}
                                                        tag={regDep.code}
                                                        imagecode={imConstruct(regDep.code.slice(-2))}
                                                        region={regDep.name}

                                                        department={regDep.code.slice(-2)}
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

export default Departments;