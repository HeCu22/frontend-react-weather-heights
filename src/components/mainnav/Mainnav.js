import React, {useContext} from 'react';
import './Mainnav.css';
import {Link} from "react-router-dom";

import {ReactComponent as Logo} from "../../assets/icons/logo-weather-heights.svg";
import Button from "../button/Button";
import {ReactComponent as Search} from "../../assets/icons/search.svg";


function Mainnav({children}) {


    return (
        <div className="outer-container main-nav-background">
            <div className="inner-container">
            <div className="outer-row">
                <div className="left-nav">
                        <span className="max">
                        <Logo className="icon-logo"/>
                        </span>
                </div>
                <div className="mid-nav">
                    {children}
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
        </div>
    );
};

export default Mainnav;