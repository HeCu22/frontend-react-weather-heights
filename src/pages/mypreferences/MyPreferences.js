import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {LocContext} from "../../context/LocContext";
import Mainnav from "../../components/mainnav/Mainnav";
import './MyPreferences.css';
import Compare from "../../components/compare/Compare";
import Grid from "../../components/grid/Grid";
import GridSlider from "../../components/gridslider/GridSlider";
import {ReactComponent as Sort} from "../../assets/icons/adjust-v.svg";
import {ReactComponent as Filter} from "../../assets/icons/adjust-h.svg";


function MyPreferences(props) {
    const {isAuthenticated} = useContext(AuthContext);
    const {favLocations} = useContext(LocContext);
    const [error, setError] = useState('');
    const [loading, toggleLoading] = useState(false);
    const [performCompare, setPerformCompare] = useState(false)
    const [counter, setCounter] = useState(0);
    const [lineSave, setLinesSave] = useState([{}]);
    const [gridOn, toggleGridOn] = useState(true);


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
            setCounter(counter + 1);
            setPerformCompare(true);
    }

    useEffect(() => {
        // console.log('gemount in myPreferences');

    }, []);

    useEffect(() => {

        // console.log('geupdate in myPreferences');

    }, [counter]);

    return (
        <>
            {error &&
                <span>  Something went wrong fetching the data  </span>
            }
            {loading && <span>Loading...</span>}

            <Mainnav>
                <ul className="outer-row">
                    <li> France</li>

                    <li> myPreferences</li>
                    <li> myLocations</li>
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
                    <GridSlider
                        gridOn={gridOn}
                        link="/mylocations"/>
                </ul>
            </Mainnav>

            <main className="outer-container">
                <div className="inner-container">
                    <div className="tiles">
                        <div className="tile">
                            <p>MyPreferences</p>
                            <div className="compare-values">
                                <form id="compare-values" onSubmit={onFormSubmit}>
                                    <h5>Selection <span className="filter"> <Filter/> </span> <span
                                        className="sort"><Sort/> </span></h5>

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
                                    <br></br>
                                    <br></br>
                                    <h4>More aspects in overview</h4>
                                    <p>Realfeal (°C):</p>
                                    <p>Air quality:</p>
                                    <p>Visibility:</p>

                                </form>


                            </div>
                        </div>
                        {performCompare ?
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
                            :
                            <div className="tile">
                                {Object.keys(favLocations).length > 0 &&
                                    <Grid
                                        key={(new Date())}
                                        mylocations={favLocations}
                                    />}
                            </div>
                        }
                    </div>
                </div>
            </main>

        </>
    );
}

export default MyPreferences;