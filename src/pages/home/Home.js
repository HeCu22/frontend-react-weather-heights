import React, {useContext, useEffect, useState} from 'react';
import {ReactComponent as Back} from "../../assets/icons/back-arrow.svg";
import {ReactComponent as Forward} from "../../assets/icons/forward-arrow.svg";
import imConstruct from "../../helpers/imConstruct";
import regions from '../../data/regions.json';
import Button from "../../components/button/Button";
import Article from "../../components/article/Article";
import {AuthContext} from "../../context/AuthContext";
import './Home.css';
import Mainnav from "../../components/mainnav/Mainnav";
import {Link} from "react-router-dom";

function Home() {
    const {isAuthenticated, userLogoutFunction, email} = useContext(AuthContext);
    const [more, toggleMore] = useState(false);
    const [error, setError] = useState('');
    const [loading, toggleLoading] = useState(false);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(4);
    const [counter,setCounter] = useState(0);

    regions.sort((a, b) => a.regioncapital - b.regioncapital);

    // console.log('regions', regions)

    function goForward() {
        console.log('blader', start, end);
        setStart(end)
        toggleMore(false);
        if (end > regions.length + 4) {
            setEnd(regions.length);

        } else {
            setEnd(end + 4)
        }
        ;
    }


    function goBackward() {
        console.log('bladerterug', start, end);
        setEnd(start);
        toggleMore(false);

        if (start > 3 ) {
            setStart(start - 4);

        } else {
            setStart(0);
        }
        ;
    }

    useEffect(() => {
        console.log('🍌 Ik ben voor de eerste keer gemount in home');
    }, []);

    useEffect(() => {
        console.log('♻️ Ik ben geupdate in home');
    }, [more]);


    return (
        <>

            {loading && <span>Loading...</span>}

            <Mainnav>
                <ul className="outer-row">
                    <li> France</li>
                    <li> Regions</li>
                    <li><Link to="/departments/75"> Departments </Link></li>
                    {isAuthenticated &&
                        <li><Link to="/mylocations"> MyLocations </Link></li>
                    }
                    <li><Link to="/search"> Cities </Link></li>

                </ul>

            </Mainnav>


            <main className="outer-container main-header-background">
                <div className="inner-container">
                    <div className="mid">

                        <div className="header-content">
                            <h1>Weather Heights France </h1>
                            <div className="outer-row">
                                <Article
                                    key="IDF"
                                    fieldClass="top-card"
                                    pictureClass="mid-picture-span"
                                    tag="IDF"
                                    region="Île-de-France"
                                    imagecode="im75"
                                    city="Paris"
                                    locationKey="623"
                                    department="75"
                                    departmentname="Ville de Paris"
                                    more={more}
                                    error={error}
                                    setError={setError}
                                    counter={counter} setCounter={setCounter}
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
                    <Button fieldClass="cards-button"
                                clickHandler={() => toggleMore(!more)}
                                isDisabled={more}> see more... </Button>

                    <div className="outer-container main-background">
                        <div className="inner-container">

                            <div className="outer-row">


                                {regions.length > 0 && regions.slice(start, end).map((region, index) => {
                                    //maximaal 4 entries en sla hoofdstad regio over
                                    if (index < 4 && region.name !== region.regionname) {
                                        return <Article key={region.code.concat(more)}
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

export default Home;