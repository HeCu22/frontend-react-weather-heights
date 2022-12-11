import React, {createContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";
import isTokenValid from "../helpers/isTokenValid";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });
    const [error, toggleError] = useState(false);

    useEffect(() => {
        console.log('de contextAuth is zojuist opnieuw opgestart')
        // is er een token?
        const token = localStorage.getItem('weatherheightsToken');
        console.log(token);


        if (token && isTokenValid(token)) {
            // is het nog geldig ?
            // token decoderen
            const decodedToken = jwtDecode(token);
            console.log('decoded token', decodedToken);

            getUserdetails(token, decodedToken.sub)


        } else {
            // anders state leeg!
            console.log('invalid token')
            setAuth({
                ...auth,
                status: 'done',
            });
        }

    }, []);  // <--- [] betekent MOUNT effect

    const history = useHistory();

    async function checkHeroku() {
        toggleError(false);
        try {
            const response = await axios.get("https://frontend-educational-backend.herokuapp.com/api/test/all");
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
    }

    async function getUserdetails(token, id) {
        toggleError(false);
        try {

            // const {data} = await axios.get(`http://localhost:3000/600/users/${id}`,
            const {data} = await axios.get('https://frontend-educational-backend.herokuapp.com/api/user',
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                }
            );
            console.log('get', data);

            // zet de opgehaalde gebruikersdata in state
            setAuth({
                ...auth,
                isAuth: true,
                status: 'done',
                user: {
                    username: data.username,
                    email: data.email,
                },
            })

        } catch (e) {
            console.log('error userdata of', id);
            toggleError(true);
            console.error(e);
        }

    }

    if (error) {
        logout()
    }    /* when get user details results in error although the token is valid */


    function checkheroku(token) {
        checkHeroku()
        console.log('heroku');
        if (error) {
            console.log('error', error)
        }

    }


    function login(token) {


        console.log('token', token);
        // token opslaan in local storage
        localStorage.setItem('weatherheightsToken', token);
        // token decoderen
        const decodedToken = jwtDecode(token);
        console.log('decoded token', decodedToken);
        // nieuwe data opvragen van gebruiker
        getUserdetails(token, decodedToken.sub);
        // loggen
        console.log('Gebruiker is ingelogd!');
        // redirect
        history.push('/');
    }


    function logout() {
        // local storage leegmaken en state leegmaken
        localStorage.clear();
        setAuth({
            ...auth,
            isAuth: false,
            user: null,
        });
        // loggen
        console.log('user is uitgelogd');
        // redirect
        history.push('/');
    }


    const contextData = {
        isAuthenticated: auth.isAuth,
        userDetails: auth.user,
        user: auth.user,
        checkHerokuFunction: checkheroku,
        loginFunction: login,
        logoutFunction: logout,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {auth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;