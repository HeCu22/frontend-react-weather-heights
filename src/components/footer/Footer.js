import React from 'react';
import awlogo from '../../assets/images/aw_registered_horiz_transp_logo.png';

import './Footer.css';


function Footer(props) {
    return (
        <>

            <footer className="outer-container">
                <section>
                    <div className="outer-row">
                    <span className="aw-max">
                    <img className="aw-logo" src={awlogo} alt="Accuweather registered"/>
                    </span>
                        <span>
                            Powered by AccuWeather API
                        </span>
                    </div>
                    <h3>Copyright © 2022 Weather Height. All Rights Reserved.</h3>
                    <p> Last update: 20 December 2022 23:02:18</p>
                </section>
            </footer>

        </>
    );
}

export default Footer;