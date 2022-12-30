import React, {useContext, useEffect, useState} from 'react';
import {ReactComponent as Back} from "../../assets/icons/back-arrow.svg";
import {ReactComponent as Forward} from "../../assets/icons/forward-arrow.svg";
import Button from "../../components/button/Button";
import Article from "../../components/article/Article";
import {LocContext} from "../../context/LocContext";
import Mainnav from "../../components/mainnav/Mainnav";
import './MyLocations.css';
import GridSlider from "../../components/gridslider/GridSlider";
import regions from "../../data/regions.json";

function MyLocations(props) {
    const {favLocations, setFavLocFunction} = useContext(LocContext);
    const [more, toggleMore] = useState(false);
    const [error, setError] = useState('')
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(4);
    const [loading, toggleLoading] = useState(false);
    const [gridOn, toggleGridOn] = useState(false);
    const [counter, setCounter] = useState(0);

    function goForward() {
        setStart(end)
        toggleMore(false);
        if (end > favLocations.length + 4) {
            setEnd(favLocations.length);

        } else {
            setEnd(end + 4)
        }
        ;
    }


    function goBackward() {
        setEnd(start);
        toggleMore(false);
        if (start > 3) {
            setStart(start - 4);
        } else {
            setStart(0);
        }
        ;
    }

    useEffect(() => {
        // console.log('gemount in mylocations');
    }, []);

    useEffect(() => {
        // console.log('geupdate in locations',more);
    }, [more]);

    return (
        <>
            {loading && <span>Loading...</span>}

            <Mainnav>
                <ul className="outer-row">
                    <li> France</li>
                    < li> myPreferences </li>
                    < li> myLocations</li>
                    <GridSlider
                        gridOn={gridOn}
                        link="/mypreferences"/>

                </ul>

            </Mainnav>

            <main className="outer-container no-main-header">
                <div className="inner-container">
                    <div className="cards">
                        <p>MyLocations</p>
                        {(error !== '') &&
                            <span className="signal">  {error} Something went wrong fetching the data  </span>
                        }
                        {end >= regions.length && <span className="signal">Last page</span>}
                        <span>
                            <Button fieldClass="go-button"
                                    clickHandler={goBackward}
                                    isDisabled={start === 0}> <Back/> </Button>
                            <Button
                                fieldClass="go-button"
                                clickHandler={goForward}
                                isDisabled={end >= regions.length}> <Forward/></Button></span>


                    </div>

                    {favLocations.length > 0 &&
                        <Button fieldClass="cards-button"
                                clickHandler={() => toggleMore(!more)}
                                isDisabled={more}> see more... </Button>}
                    <div className="outer-container main-background">
                        <div className="inner-container">

                            <div className="outer-row">

                                {favLocations.length > 0 && favLocations.slice(start, end).map((favLoc, index) => {

                                    if (favLoc.key > "" && index < 4) {

                                        return <Article key={favLoc.key.concat(more)}
                                                        fieldClass="card"
                                                        pictureClass="small-picture-span"
                                                        locationKey={favLoc.key}
                                                        city={favLoc.city}
                                                        more={more}
                                                        error={error}
                                                        setError={setError}
                                                        counter={counter} setCounter={setCounter}
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