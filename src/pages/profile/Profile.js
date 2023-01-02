import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import Mainnav from "../../components/mainnav/Mainnav";
import './Profile.css';
import {AuthContext} from "../../context/AuthContext";


function Profile() {

    const {user} = useContext(AuthContext);

    return (
        <>
            <Mainnav>
                <ul className="outer-row">
                    <li> France</li>
                    <li> Weather Heights</li>
                </ul>
            </Mainnav>
            <main className="outer-container no-main-header">
                <div className="inner-container">
                    <div className="mid">
                        <h1>Profile Page</h1>

                        <section className="formSpace">
                            <h2>User Details</h2>
                            <p><strong>User name:</strong> {user.username}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <h2>Profile-content</h2>
                            <p>Extra information: {user.info}</p>
                            <ul>
                                {user.roles.map((role) => {
                                    return <li key={role.id}>
                                        {role.name}
                                    </li>
                                })}

                            </ul>


                        </section>
                        <p>Terug naar de <Link to="/">Homepagina</Link></p>
                    </div>

                </div>


            </main>
        </>
    );
}

export default Profile;