import React, {useContext, useState} from 'react';
import {ReactComponent as Goto} from "../../assets/icons/go.svg";
import {ReactComponent as Back} from "../../assets/icons/back-arrow.svg";
import {ReactComponent as Forward} from "../../assets/icons/forward-arrow.svg";
import imConstruct from "../../helpers/imConstruct";
import departments from '../../data/departments.json';
import adminarea from '../../data/adminarea.json';
import regions from '../../data/regions.json';
import depcapitals from '../../data/depcapitals.json';
import Button from "../../components/button/Button";
import Article from "../../components/article/Article";
import {AuthContext} from "../../context/AuthContext";

import tslocation from '../../data/tslocation.json';
import test from '../../data/test.json';
import './Departments.css';
import Mainnav from "../../components/mainnav/Mainnav";
import {Link, useParams} from "react-router-dom";


function Departments(props) {
    const {department} = useParams();

    const {isAuthenticated, userLogoutFunction, email} = useContext(AuthContext);
    const [background, setBackground] = useState("outer-container main-header-background");
    const [location, setLocation] = useState(null);
    const [currConditions, setCurrConditions] = useState(null);
    const [more, toggleMore] = useState(false);
    const [marked, setMarked] = useState("white");
    const [checked, toggleChecked] = useState(false);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

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

    return (
        <>

            {error &&
                <span>  Something went wrong fetching the data  </span>
            }
            {loading && <span>Loading...</span>}
            {!regioncapital ? <span>Capital of this department is not capital or region. Go back to previous page.</span>
                :
                <>
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
                                            <Article
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

                                            if (index < 99 && !regDep.code.includes((department))) {

                                                // ophalen hoofdstad van department
                                                const departmentCapital = depcapitals.find((depname) => {
                                                    return depname.departmentcode === regDep.code.slice(-2)
                                                })
                                                return <Article key={regDep.code}
                                                                fieldClass="card"
                                                                pictureClass="small-picture-span"
                                                                tag={regDep.parent}
                                                                imagecode={imConstruct(regDep.code.slice(-2))}
                                                                region={regDep.name}
                                                                city={departmentCapital.capitalname}
                                                                department={regDep.code.slice(-2)}
                                                                departmentname={regDep.name}
                                                                more={more}
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