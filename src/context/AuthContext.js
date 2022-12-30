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
    const [error, setError] = useState('');


    useEffect(() => {
        // console.log('de contextAuth is zojuist opnieuw opgestart')
        // is er een token?
        const token = localStorage.getItem('weatherheightsToken');

        if (token && isTokenValid(token)) {
            // is het nog geldig ?
            // token decoderen
            const decodedToken = jwtDecode(token);

            getUserdetails(token, decodedToken.sub)


        } else {
            // anders state leeg!

            setAuth({
                ...auth,
                status: 'done',
            });
        }

    }, []);  // <--- [] betekent MOUNT effect

    const history = useHistory();

    // check api bereikbaar
    async function checkHeroku() {
        setError('');
        try {
            const response = await axios.get("https://frontend-educational-backend.herokuapp.com/api/test/all");
        } catch (e) {
            console.error(e);
            setError(e.message);

        }
    }

    async function getUserdetails(token, id) {
        setError('');
        try {


            const {data} = await axios.get('https://frontend-educational-backend.herokuapp.com/api/user',
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                }
            );

            if (data.roles.find((role) => {
                return role.name === "ROLE_ADMIN";
            })) {
                const overview = await axios.get('https://frontend-educational-backend.herokuapp.com/api/admin/all',
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        }
                    }
                );
                console.log('get all', overview);
            }

            // zet de opgehaalde gebruikersdata in state
            setAuth({
                ...auth,
                isAuth: true,
                status: 'done',
                user: {
                    username: data.username,
                    email: data.email,
                    roles: data.roles,
                },
            })

        } catch (e) {
            console.error(e)
            setError(e.message);

        }

    }

    if (error) {
        logout()
    }    /* when get user details results in error although the token is valid */


    function checkheroku(token) {
        checkHeroku();
        if (error) {
            console.log('error', error)
        }

    }


    function login(token) {

        // token opslaan in local storage
        localStorage.setItem('weatherheightsToken', token);
        // token decoderen
        const decodedToken = jwtDecode(token);

        // nieuwe data opvragen van gebruiker
        getUserdetails(token, decodedToken.sub);
        // loggen
        // console.log('Gebruiker is ingelogd!');
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
        // console.log('user is uitgelogd');
        // redirect
        history.push('/');
    }


    const contextData = {
        isAuthenticated: auth.isAuth,
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