import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {LocContext} from "../../context/LocContext";
import Mainnav from "../../components/mainnav/Mainnav";
import {Link} from "react-router-dom";
import './MyPreferences.css';
import Compare from "../../components/compare/Compare"
import CounterResult from "../../components/CounterResult";
import GridSlider from "../../components/gridslider/GridSlider";


function MyPreferences(props) {
    const {isAuthenticated, userLogoutFunction, email} = useContext(AuthContext);
    const {favLocations, setFavLocFunction} = useContext(LocContext);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [performCompare, setPerformCompare] = useState(false)
    const [counter, setCounter] = useState(0);
    const [lineSave, setLinesSave] = useState([{}]);

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
        e.preventDefault()
        setState({...state});
        setPerformCompare(false);

    }

    function handleChange(e) {
        const value =
            e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setState({...state, [e.target.name]: value})
        setPerformCompare(false);

    }

    function compare() {
        {
            setCounter(counter + 1);
            console.log(counter);
            setPerformCompare(true);
        }

    }

    useEffect(() => {
        console.log('🍌 Ik ben voor de eerste keer gemount in myPreferences');

    }, []);

    useEffect(() => {

        console.log('♻️ Ik ben geupdate in myPreferences');

    }, [counter]);

    return (
        <>


            {counter < 4 && <CounterResult amount={counter}/>}
            {error &&
                <span>  Something went wrong fetching the data  </span>
            }
            {loading && <span>Loading...</span>}
            {counter > 6 && <p>Meer dan 6!!!!!</p>}


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
                    <GridSlider/>
                    {isAuthenticated &&
                        <li><Link to="/"> Top List </Link></li>
                    }
                </ul>
            </Mainnav>

            <main className="outer-container main-background">
                <div className="inner-container">
                    <div className="outer-row">
                        <div className="tile">
                            <p>MyPreferences</p>
                            <div className="compare-values">
                                <form id="compare-values" onSubmit={onFormSubmit}>
                                    <h5>General</h5>
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

                                    <p>Sun hours: </p>

                                    <label htmlFor="wind-kmh" className="row">
                                        <span>Wind km per hour:</span>
                                        <input
                                            type="number"
                                            id="wind-kmh"
                                            name="windkmh"
                                            value={state.windkmh}
                                            onChange={handleChange}/>

                                        <span id="added-text">
                                            max
                                        </span>

                                        <input type="checkbox"
                                               className=""
                                               id="wind-sort"
                                               name="windsort"
                                               checked={state.windsort}
                                               onChange={handleChange}
                                        />


                                    </label>

                                    <p>Wind gusts: </p>


                                    <label htmlFor="rain-mm" className="row">
                                        <span>Rain mm per day : </span>
                                        <input
                                            type="number"
                                            id="rain-mm"
                                            name="rainmm"
                                            value={state.rainmm}
                                            onChange={handleChange}/>

                                        <span id="added-text">
                                            max
                                        </span>

                                        <input type="checkbox"
                                               className=""
                                               id="rain-sort"
                                               name="rainsort"
                                               checked={state.rainsort}
                                               onChange={handleChange}
                                        />


                                    </label>
                                    <br/>
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
                                        key={(new Date())}
                                        mylocations={favLocations}
                                        state={state}
                                        linesSave={lineSave}
                                        setLinesSave={setLinesSave}
                                        counter={counter}
                                        setCounter={setCounter}

                                    />
                                }
                            </div>
                        }
                    </div>
                </div>
            </main>

            {console.log('Ik ben gerenderd', lineSave)}
        </>
);
}

export default MyPreferences;