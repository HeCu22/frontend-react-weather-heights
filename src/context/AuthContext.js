import React, {createContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [auth,setAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });

    useEffect(() => {
        console.log('de context is zojuist opnieuw opgestart')
        // is er een token?
        const token = localStorage.getItem('weatherheightsToken');
        console.log(token);


        if (token) {
            // is het nog geldig ?
            // token decoderen
            const decodedToken = jwtDecode(token);
            console.log('decoded token', decodedToken);

            getUserdetails(token,decodedToken.sub);

        } else {
            // anders state leeg!
            setAuth({
                ...auth,
                status: 'done',
            });
        }

    }, []);  // <--- [] betekent MOUNT effect

    const history = useHistory();

    async function getUserdetails(token,id) {
        try {
            const {data} = await axios.get(`http://localhost:3000/600/users/${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }}
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

            console.error(e);
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
        getUserdetails(token,decodedToken.sub);
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
        email: auth.user,
        loginFunction: login,
        logoutFunction: logout,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {auth.status === 'done'? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;