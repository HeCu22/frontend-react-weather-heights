import React, {useContext, useState, useEffect} from 'react'
import axios from "axios";
import {Link} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext';
import {ReactComponent as Logo} from "../../assets/icons/logo-weather-heights.svg";
import './Signin.css';
import Mainnav from "../../components/mainnav/Mainnav";

function SignIn() {
    const [error, toggleError] = useState(false);
    const {loginFunction} = useContext(AuthContext);

    const [formState, setFormState] = useState({
        inputEmail: "",
        inputPw: "",
    })

    const source = axios.CancelToken.source();
    // mocht onze pagina ge-unmount worden voor we klaar zijn met data ophalen, aborten we het request
    useEffect(() => {
        console.log('cleanup');
        return function cleanup() {
            source.cancel();
        }
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        toggleError(false);
        console.log({formState});
        try {
            const {data: {accessToken}} = await axios.post(`http://localhost:3000/login`,
                {
                    email: formState.inputEmail,
                    password: formState.inputPw,
                },
                { cancelToken: source.token,
                }
            );
            loginFunction(accessToken);
        } catch (e) {

            console.error(e);
            toggleError(true);
        }

    }

    function handleChange(evt) {
        evt.preventDefault()
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
                            <legend>
                                <label htmlFor="input-user">
                                    <span> user email:</span>

                                    <input type="tekst"
                                           id="input-user"
                                           name="inputEmail"
                                           value={formState.inputEmail}
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

                            <button type="submit"
                                    disabled={(formState.inputEmail.length > 0 && formState.inputPw.length > 0) === false ? true : false}>
                                Inloggen
                            </button>

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