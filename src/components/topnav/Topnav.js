import * as React from 'react';
import './Topnav.css';
import {useHistory, Link} from "react-router-dom";

function Topnav(props) {
    const history = useHistory();
    return (
        <>
            <header className="outer-container top-nav-background">
                <div className="inner-container">

                    <div className="top-navigation">
                        <nav className="top-nav-menu">
                            <ul>
                                <li><Link to="/">myLocations</Link></li>
                                <li><Link to="/">myPreferences</Link></li>
                                <li><Link to="/">Profile</Link></li>
                                <li><Link to="/">Login</Link></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Topnav;