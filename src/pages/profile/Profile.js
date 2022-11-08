import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Mainnav from "../../components/mainnav/Mainnav";
import './Profile.css';


function Profile() {

    return (
        <>
            <Mainnav>
                <ul className="outer-row">
                    <li> France</li>
                    <li> Weather Heights</li>
                </ul>
            </Mainnav>
            <main className="outer-container empty-header-background">
                <div className="inner-container">
                    <div className="mid">
                        <h1>Profielpagina</h1>

                        <section className="formSpace">
                            <h2>Gegevens</h2>
                            <p><strong>Gebruikersnaam:</strong> hardcoded-test</p>
                            <p><strong>Email:</strong> hardcoded@test.com</p>
                            <h2>profiel-content</h2>
                            <p></p>
                        </section>
                        <p>Terug naar de <Link to="/">Homepagina</Link></p>
                    </div>

                </div>


            </main>
        </>
    );
}

export default Profile;