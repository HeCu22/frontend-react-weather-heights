import React, {useContext, useState} from 'react';
import axios from "axios";
import {Link} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext';
import {ReactComponent as Logo} from "../../assets/icons/logo-weather-heights.svg";
import './Signup.css';


function SignUp() {
    const {loginFunction} = useContext(AuthContext);

    // state voor functionaliteit
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    const [formState, setFormState] = useState({
        inputUser: "",
        inputPw: "",
        inputEmail: "",
    })

    async function handleSubmit(e) {
        e.preventDefault();
        toggleError(false);
        toggleLoading(true);

        console.log(formState);
        try {
            axios.post(`http://localhost:3000/register`,
                {
                    email: formState.inputEmail,
                    password: formState.inputPw,
                    username: formState.inputUser,
                }
            )

        } catch (e) {
            toggleError(true);

            console.error(e);
        }
        toggleLoading(false);
    }

    function handleChange(evt) {
        evt.preventDefault()
        const value = evt.target.value;
        setFormState({...formState, [evt.target.name]: value});


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
                    <h1>Register</h1>

                </div>
            </div>
        </div>

        <main className="outer-container empty-header-background">
            <div className="inner-container">
                <div className="mid">
                    <form className="formSpace" onSubmit={handleSubmit}>
                        <legend>
                            <label htmlFor="input-email">
                                <span>Email adres:</span>

                                <input type="tekst"
                                       id="input-email"
                                       name="inputEmail"
                                       value={formState.inputEmail}
                                       onChange={handleChange}
                                />
                            </label>
                            <label htmlFor="input-user">
                                <span>Username:</span>

                                <input type="tekst"
                                       id="input-user"
                                       name="inputUser"
                                       value={formState.inputUser}
                                       onChange={handleChange}/>

                            </label>
                            <br></br>
                            <label htmlFor="input-pw">
                                <span>Password:</span>
                                <input type="tekst"
                                       id="input-pw"
                                       name="inputPw"
                                       value={formState.inputPw}
                                      onChange={handleChange}/>

                            </label>
                        </legend>


                    <button

                        type="submit"
                        disabled={(formState.inputUser.length > 0 && formState.inputPw.length > 0 && formState.inputEmail.length > 0) === false ? true : false}
                    >
                        Registreer
                    </button>
                </form>
                <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
            </div>

        </div>


        </main>

</>
)
    ;
}

export default SignUp;