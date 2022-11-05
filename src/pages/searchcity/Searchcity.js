import * as React from 'react';
import './Searchcity.css';
import {Link, useHistory} from "react-router-dom";
import {ReactComponent as Logo} from "../../assets/icons/logo-weather-heights.svg";
import {ReactComponent as Search} from "../../assets/icons/search.svg";
import Button from "../../components/button/Button";
import {ReactComponent as Goto} from "../../assets/icons/go.svg";
import {useState} from "react";

function Searchcity(props) {
    const history = useHistory();
    const [state, setState] = useState({
        searchcity: ""
    })

    function doThingsOnClick() {
        console.log('Geliked!');
    }

    function onFormSubmit(e) {
        e.preventDefault();
        setState(state.searchcity);
        history.push(`/details/${state.searchcity}`);
    }

    function handleChange(e) {
        e.preventDefault()
        const value = e.target.value;
        setState({...state, [e.target.name]: value});
    }

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
                            <input
                                type="tekst"
                                id="input-city"
                                name="searchcity"
                                value={state.searchcity}
                                onChange={handleChange}
                                placeholder=" search city in France"/>

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