import React from 'react';
import './Mainnav.css';
import {useHistory, Link} from "react-router-dom";
import {ReactComponent as Logo} from "../../assets/icons/logo-weather-heights.svg";
import Button from "../button/Button";
import {ReactComponent as Search} from "../../assets/icons/search.svg";


function Mainnav () {
    const history = useHistory();
    return (
        <div className="outer-container main-nav-background">
            <div className="outer-row">
                <div className="left-nav">
                        <span className="max">
                        <Logo className="icon-logo"/>
                        </span>
                </div>
                <div className="mid-nav">
                    <ul className="outer-row">
                        <li><Link to="/"> France</Link></li>
                        <li><Link to="/"> Regions</Link></li>
                        <li><Link to="/"> Departments </Link></li>
                        <li><Link to="/"> Cities </Link></li>
                    </ul>
                </div>
                <div className="right-nav">
                    <button>
                        <Link to="/search">
                            <Search/>
                        </Link>

                    </button>

                </div>
            </div>

        </div>
    );
};

export default Mainnav;