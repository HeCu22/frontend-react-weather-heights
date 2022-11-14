import React, {useState} from 'react';
import './Searchcity.css';
import {Link, useHistory} from "react-router-dom";
import {ReactComponent as Logo} from "../../assets/icons/logo-weather-heights.svg";
import Button from "../../components/button/Button";
import departments from "../../data/adminarea.json";


function Searchcity(props) {
    const history = useHistory();
    const [state, setState] = useState({
        searchcity: "",
        department: "FR",
    })


    function onFormSubmit(e) {
        e.preventDefault();
        setState(state.searchcity);
        setState(state.department);
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

                            <label htmlFor="department" className="column">
                                <span> Department:</span>
                                <select name="department"
                                        id="department"
                                        value={state.department}
                                        onChange={handleChange}>
                                    <option value="FR"> France </option>
                                    {departments.length > 0 &&
                                        departments.map((department) => {
                                            return <option value={department.ID}> {department.EnglishName}
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
                            <h1></h1>

                        </div>

                    </div>

                </div>


            </main>

        </>
    );
}

export default Searchcity;