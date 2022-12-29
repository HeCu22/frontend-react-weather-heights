import React, {useEffect, useState} from 'react';
import {ReactComponent as Back} from "../../assets/icons/back-arrow.svg";
import {ReactComponent as Forward} from "../../assets/icons/forward-arrow.svg";
import imConstruct from "../../helpers/imConstruct";
import departments from '../../data/departments.json';
import adminarea from '../../data/adminarea.json';
import regions from '../../data/regions.json';
import depcapitals from '../../data/depcapitals.json';
import Button from "../../components/button/Button";
import Article from "../../components/article/Article";


import './Departments.css';
import Mainnav from "../../components/mainnav/Mainnav";
import {Link, useParams} from "react-router-dom";


function Departments(props) {
    const {department} = useParams();

    const [background, setBackground] = useState("outer-container main-header-background");
    const [location, setLocation] = useState(null);
    const [currConditions, setCurrConditions] = useState(null);
    const [more, toggleMore] = useState(false);

    const [error, setError] = useState('');
    const [loading, toggleLoading] = useState(false);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(4);
    const [counter, setCounter] = useState(0);
    const string = "".concat("FR-", department);
    const region = departments.find((departfound) => {
            return departfound.code === string
        }
    )

    // hier filter ik de departments behorende bij de regio van doorgegeven department uit
    const regionDepartments = departments.filter((regionDepartment) => {
        return regionDepartment.parent === region.parent
    })

    // hier zoek ik de naam van doorgegeven department op
    const adminDepartment = adminarea.find((departmentFound) => {
        return departmentFound.ID === `${department}`
        // return departmentFound.EnglishName === region.name
    })

    // om na te gaan wat hoofdstad van de regio is en de location key daarvan
    const regioncapital = regions.find((found) => {
        return found.regioncapital === `${department}`
    })

    function goForward() {
        setStart(end)
        toggleMore(false);
        if (end > regionDepartments.length + 4) {
            setEnd(regionDepartments.length);

        } else {
            setEnd(end + 4)
        }
        ;
    }

    function goBackward() {

        setEnd(start);

        if (start > 3) {
            setStart(start - 4);

        } else {
            setStart(0);
        }
        ;
    }

    useEffect(() => {
        // console.log('gemount in departments');
    }, []);

    useEffect(() => {
        // console.log('geupdate in departments');
    }, [more]);


    return (
        <>


            {loading && <span>Loading...</span>}
            {!regioncapital ?
                <span>Capital of this department is not capital or region. Go back to previous page.</span>
                :
                <>
                    <Mainnav>
                        <ul className="outer-row">
                            <li> France</li>
                            <li><Link to="/"> Regions</Link></li>
                            <li> Departments</li>
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
                                            <Article
                                                key={regioncapital.key}
                                                fieldClass="top-card"
                                                pictureClass="mid-picture-span"
                                                tag={region.parent}
                                                region={regioncapital.name}
                                                imagecode={imConstruct(department)}
                                                locationKey={regioncapital.key}
                                                city={regioncapital.capital}
                                                department={department}
                                                departmentname={adminDepartment.EnglishName}
                                                more={more}
                                                error={error}
                                                setError={setError}
                                                counter={counter} setCounter={setCounter}
                                            />


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
                                    isDisabled={more}> see more ... </Button>
                            <div className="outer-container main-background">
                                <div className="inner-container">

                                    <div className="outer-row">

                                        {regionDepartments.length > 0 && regionDepartments.slice(start, end).map((regDep, index) => {
                                            //maximaal 4 entries en sla hoofdstad departement over
                                            if (index < 4 && !regDep.code.includes((department))) {

                                                // ophalen hoofdstad van department
                                                const departmentCapital = depcapitals.find((depcapital) => {
                                                    return depcapital.departmentcode === regDep.code.slice(-2)
                                                })

                                                return <Article key={regDep.code.concat(more)}
                                                                fieldClass="card"
                                                                pictureClass="small-picture-span"
                                                                tag={regDep.parent}
                                                                imagecode={imConstruct(departmentCapital.departmentcode)}
                                                                region={regDep.name}
                                                                city={departmentCapital.capitalname}
                                                                department={departmentCapital.departmentcode}
                                                                departmentname={regDep.name}
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

                </>}
        </>
    );
}

export default Departments;