import React, {useContext, useState, useEffect} from 'react'
import axios from "axios";
import {Link} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext';
import {ReactComponent as Logo} from "../../assets/icons/logo-weather-heights.svg";
import './Signin.css';
import Mainnav from "../../components/mainnav/Mainnav";
import Button from "../../components/button/Button";

function SignIn() {
    const [error, toggleError] = useState(false);
    const {loginFunction, checkHerokuFunction} = useContext(AuthContext);

    const [formState, setFormState] = useState({
        inputPw: "",
        inputUser: "",
    })

    const source = axios.CancelToken.source();
    // mocht onze pagina ge-unmount worden voor we klaar zijn met data ophalen, aborten we het request
    useEffect(() => {
        console.log('cleanup');
        checkHerokuFunction();
        return function cleanup() {
            source.cancel();
        }
    }, []);

    async function handleSubmit(e) {
        e.preventDefault()
        checkHerokuFunction();
        toggleError(false);
        console.log({formState});
        try {
            const {data: {accessToken}} = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signin',
                {
                    "username": formState.inputUser,
                    "password": formState.inputPw,
                });
            console.log('accessToken', accessToken);
            loginFunction(accessToken);
        } catch (e) {

            console.error(e);
            toggleError(true);

        }

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
                        <h1>Sign In</h1>
                        <form className="formSpace" onSubmit={handleSubmit}>
                            {error &&
                                <span className="signal">  Usercode or Password failed. Please try again...  </span>
                            }
                            <legend>
                                <label htmlFor="input-user">
                                    <span> user code:</span>

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
                                fieldClass="signin-button"
                                type="submit"
                                isDisabled={(formState.inputUser.length > 5 && formState.inputPw.length > 5) === false ? true : false}
                                clickHandler={handleSubmit}
                            >
                                Login
                            </Button>

                        </form>
                        <p>Still no account? <Link to="/signup">Register</Link> first</p>


                    </div>

                </div>


            </main>

        </>
    )
        ;
}

export default SignIn;