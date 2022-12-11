import React, {useContext, useState} from 'react';
import axios from "axios";
import {Link} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext';
import {ReactComponent as Logo} from "../../assets/icons/logo-weather-heights.svg";
import './Signup.css';
import Mainnav from "../../components/mainnav/Mainnav";
import Button from "../../components/button/Button";


function SignUp() {
    const {checkHerokuFunction} = useContext(AuthContext);

    // state voor functionaliteit
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [message,setMessage] = useState("");

    const [formState, setFormState] = useState({
        inputUser: "",
        inputPw: "",
        inputEmail: "",
    })

    async function handleSubmit(e) {
        e.preventDefault()
        checkHerokuFunction();
        toggleError(false);
        toggleLoading(true);
setMessage("");
        console.log(formState);
        try {
            await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signup',
                {
                    "username": formState.inputUser,
                    "email": formState.inputEmail,
                    "password": formState.inputPw,
                    "role": ["user"]
                });
            setMessage("User successfully registered")

        } catch (e) {
            toggleError(true);
            console.log('error', e.response);
            console.error(e);


        }
        toggleLoading(false);
    }

    function handleChange(evt) {
        evt.preventDefault()
        checkHerokuFunction();
        const value = evt.target.value;
        setFormState({...formState, [evt.target.name]: value});


    }

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
                        <h1>Register</h1>
                        <form className="formSpace" onSubmit={handleSubmit}>
                            {error &&
                                <span className="signal"> Request failed. Please check username is already registered..  </span>
                            }
                            {message &&
                                <span className="signal"> {message}  </span>
                            }
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


                            <Button
                                fieldClass="sign-button"
                                type="submit"
                                isDisabled={(formState.inputUser.length > 5 && formState.inputPw.length > 5 && formState.inputEmail.includes("@")) === false ? true : false}
                            clickHandler={handleSubmit}
                            >
                                Signup
                            </Button>
                        </form>
                        <p>Already have an account? You can signin <Link to="/signin">here</Link> to login.</p>
                    </div>

                </div>


            </main>

        </>
    )
        ;
}

export default SignUp;