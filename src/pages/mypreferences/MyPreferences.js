import React, {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {LocContext} from "../../context/LocContext";
import Mainnav from "../../components/mainnav/Mainnav";
import {Link} from "react-router-dom";
import './MyPreferences.css';
import comparefunction from "../../helpers/comparefunction";
import Article from "../../components/article/Article";
import Compare from "../../components/compare/Compare";
import Button from "../../components/button/Button";
import {ReactComponent as Goto} from "../../assets/icons/go.svg";
import myLocations from "../mylocations/MyLocations";

function MyPreferences(props) {
    const {isAuthenticated, userLogoutFunction, email} = useContext(AuthContext);
    const {favLocations, setFavLocFunction} = useContext(LocContext);

    const [currConditions, setCurrConditions] = useState(null);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [performCompare, setPerformCompare] = useState(false);
    const [state, setState] = useState({
        tempmin: 20,
        tempmax: 25,
        rainmm: 0,
        windkmh: 3,
    })

    function onFormSubmit(e) {
        e.preventDefault();
        setState(state.tempmin);
        setState(state.tempmax);

    }

    function handleChange(e) {
        e.preventDefault()
        const value = e.target.value;
        setState({...state, [e.target.name]: value});
    }

    function compare(e) {
        e.preventDefault()
        setPerformCompare(true);

    }

    return (
        <>
            {console.log('comapare', performCompare)}
            <Mainnav>
                <ul className="outer-row">
                    <li> France</li>
                    <li><Link to="/"> Regions</Link></li>
                    <li> MyPreferences</li>
                    {isAuthenticated &&
                        <li>
                            <button
                                type="button"
                                onClick={compare}
                            >
                                Compare
                            </button>
                        </li>
                    }
                    <li> Overview</li>
                    {isAuthenticated &&
                        <li><Link to="/"> Grid </Link></li>
                    }
                </ul>
            </Mainnav>

            <main className="outer-container main-background">
                <div className="inner-container">
                    <div className="tiles">
                        <div className="tile">
                            <p>MyPreferences</p>
                            <div className="">
                                <h5>General</h5>
                                <form id="compare-values" className="" onSubmit={onFormSubmit}>
                                    <label htmlFor="tempmin" className="row">
                                        <span>Temperature (°C):</span>
                                        <input
                                            type="number"
                                            id="temp-min"
                                            name="tempmin"
                                            value={state.tempmin}
                                            onChange={handleChange}/>
                                        <input
                                            type="number"
                                            id="temp-max"
                                            name="temp-max"
                                            value={state.tempmax}
                                            onChange={handleChange}/>

                                    </label>
                                    <p>Sun (UV):</p>
                                    <p>Sun hours: </p>
                                    <p>Wind km/h: </p>
                                    <p>Wind gusts: </p>
                                    <p>Rain mm: </p>
                                    <h5>More</h5>
                                    <p>Realfeal (°C):</p>
                                    <p>Air quality:</p>
                                    <p>Visibility:</p>

                                </form>


                            </div>
                        </div>
                        {performCompare &&
                            <div className="tile">
                                    {favLocations.length > 0 &&
                                        <Compare
                                            mylocations={favLocations}
                                            tempmin={state.tempmin}
                                            tempmax={state.tempmax}
                                        />
                                    }
                            </div>
                        }
                    </div>
                </div>
            </main>
        </>
    );
}

export default MyPreferences;