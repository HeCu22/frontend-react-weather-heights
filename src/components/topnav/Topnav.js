import React, {useContext} from 'react';
import './Topnav.css';
import {useHistory, Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";

function Topnav(props) {
    const {isAuthenticated, logoutFunction,email} = useContext(AuthContext);
    const history = useHistory();
    return (
        <>
            <header className="outer-container top-nav-background">
                <div className="inner-container">

                    <div className="top-navigation">
                        <nav className="top-nav-menu">
                            <ul>
                                <li><Link to="/">regions</Link></li>

                                <li><Link to="/mylocations">myLoc</Link></li>


                                <li><Link to="/mypreferences">myPref</Link></li>


                                {isAuthenticated ?
                                    <>


                                    <li><Link to="/profile">Profile</Link></li>

                                        <li><button
                                        type="button"
                                        onClick={logoutFunction}
                                    >
                                        Logout
                                    </button></li>
                                    </>
                                    :
                                    <>
                                    <li><Link to="/signup">Register</Link></li>


                                        <li><Link to="/signin">Login</Link></li>
                                    </>
                                }
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Topnav;