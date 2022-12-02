import React, {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {LocContext} from "../../context/LocContext";
import Mainnav from "../../components/mainnav/Mainnav";
import {Link} from "react-router-dom";
import './MyPreferences.css';
import Compare from "../../components/compare/Compare";
import GridSlider from "../../components/gridslider/GridSlider";


function MyPreferences(props) {
    const {isAuthenticated, userLogoutFunction, email} = useContext(AuthContext);
    const {favLocations, setFavLocFunction} = useContext(LocContext);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [performCompare, setPerformCompare] = useState(false);
    const [state, setState] = useState({
        tempmin: 20,
        tempmax: 25,
        tempsort: true,
        rainmm: 0,
        rainsort: true,
        windkmh: 3,
        windsort: true,
    })

    function onFormSubmit(e) {
        e.preventDefault();

setPerformCompare(false);
    }

    function handleChange(e) {
        const value =
            e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setState({...state, [e.target.name]: value})
        setPerformCompare(false);
    }


    return (
        <>
            {console.log('compare', performCompare)}
            {error &&
                <span>  Something went wrong fetching the data  </span>
            }
            {loading && <span>Loading...</span>}
            <Mainnav>
                <ul className="outer-row">
                    <li> France</li>
                    <li><Link to="/"> Regions</Link></li>
                    <li> MyPreferences</li>
                    {isAuthenticated &&
                        <li>
                            <button
                                type="button"
                                onClick={() => {
                                    setPerformCompare(true)
                                }}
                            >
                                Compare
                            </button>
                        </li>
                    }
                    <GridSlider/>
                    {isAuthenticated &&
                        <li><Link to="/"> Top List </Link></li>
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
                                    <label htmlFor="temp" className="row">
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
                                            name="tempmax"
                                            value={state.tempmax}
                                            onChange={handleChange}/>
                                        <input type="checkbox"
                                               className=""
                                               id="temp-sort"
                                               name="tempsort"
                                               checked={state.tempsort}
                                               onChange={handleChange}
                                        />

                                    </label>
                                    <p>Sun (UV):</p>
                                    <p>Sun hours: </p>

                                        <label htmlFor="wind-kmh" className="row">
                                            <span>Wind km/h::</span>
                                            <input
                                                type="number"
                                                id="wind-kmh"
                                                name="windkmh"
                                                value={state.windkmh}
                                                onChange={handleChange}/>
                                            <input type="checkbox"
                                                   className=""
                                                   id="wind-sort"
                                                   name="windsort"
                                                   checked={state.windsort}
                                                   onChange={handleChange}
                                            />
                                        </label>

                                        <p>Wind gusts: </p>


                                            <label htmlFor="rain-kmh" className="row">
                                                <span>Rain mm: </span>
                                                <input
                                                    type="number"
                                                    id="rain-mm"
                                                    name="rainmm"
                                                    value={state.rainmm}
                                                    onChange={handleChange}/>


                                    <input type="checkbox"
                                           className=""
                                           id="rain-sort"
                                           name="rainsort"
                                           checked={state.rainsort}
                                           onChange={handleChange}
                                    />
                                            </label>

                                        <h5>More</h5>
                                        <p>Realfeal (°C):</p>
                                        <p>Air quality:</p>
                                        <p>Visibility:</p>

                                </form>


                            </div>
                        </div>
                        {performCompare &&
                            <div className="tile">
                                {Object.keys(favLocations).length > 0 &&
                                    <Compare
                                        key={favLocations.toString()}
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