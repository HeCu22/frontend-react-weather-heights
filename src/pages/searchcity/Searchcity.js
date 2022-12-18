import React, {useState} from 'react';
import './Searchcity.css';
import {Link, useHistory} from "react-router-dom";
import {ReactComponent as Logo} from "../../assets/icons/logo-weather-heights.svg";
import Button from "../../components/button/Button";
import departments from "../../data/adminarea.json";
import france from "../../assets/images/overzichtskaart_Franse_Departementen.png";



function Searchcity(props) {
    const history = useHistory();
    const [state, setState] = useState({
        searchcity: "Paris",
        department: "FR",
    })


    function onFormSubmit(e) {
        e.preventDefault();
        setState({...state});
        history.push(`/details/${state.searchcity},${state.department}`);
    }

    function handleChange(e) {
        e.preventDefault()
        const value = e.target.value;
        setState({...state, [e.target.name]: value});
    }

    console.log('departments', departments.length)

    return (
        <>
            <div className="outer-container main-nav-background">
                <div className="outer-row">
                    <div className="left-nav">
                        <span className="max">
                        <Logo className="icon-logo"/>
                        </span>
                    </div>
                    <div className="mid-nav">
                        <form className="outer-row" onSubmit={onFormSubmit}>

                            <label htmlFor="department-id" className="column">
                                <span> Department:</span>
                                <select
                                    id="department-id"
                                    name="department"
                                    value={state.department}
                                    onChange={handleChange}>
                                    <option value="FR"> France</option>
                                    {departments.length > 0 &&
                                        departments.map((department) => {
                                            return <option key={department.ID}
                                                           value={department.ID}> {department.ID} {department.EnglishName}
                                            </option>
                                        })
                                    }
                                </select>
                            </label>
                            <label htmlFor="city">
                                <input
                                    type="tekst"
                                    id="input-city"
                                    name="searchcity"
                                    value={state.searchcity}
                                    onChange={handleChange}
                                    placeholder=" search city in France"/>
                            </label>

                        </form>

                    </div>
                </div>
            </div>
            <main className="outer-container empty-header-background">
                <div className="inner-container">
                    <div className="mid">
                        <div className="header-content">
                            <h1>French departments</h1>
                            <div className="pictures">
                    <span className="">
                        <img className="small-picture-img" src={france} alt="french departments"/>;

                    </span>


                            </div>

                        </div>

                    </div>
                </div>


            </main>

        </>
    );
}

export default Searchcity;