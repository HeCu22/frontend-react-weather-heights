import React, {useContext} from "react";
import {Route, Switch, Redirect} from 'react-router-dom';
import {AuthContext} from "./context/AuthContext";
import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import Profile from "./pages/profile/Profile";
import MyLocations from "./pages/mylocations/MyLocations";
import MyPreferences from "./pages/mypreferences/MyPreferences";
import Topnav from "./components/topnav/Topnav";
import Home from './pages/home/Home';
import './App.css';
import Searchcity from "./pages/searchcity/Searchcity";
import Citydetails from "./pages/citydetails/Citydetails";
import Departments from "./pages/departments/Departments";
import Footer from "./components/footer/Footer";

function App() {
    const {isAuthenticated} = useContext(AuthContext);

    return (
        <>
            <Topnav/>

            <Switch>


                <Route exact path="/details/:city">
                    <Citydetails/>
                </Route>
                <Route exact path="/details/">
                    <Citydetails/>
                </Route>
                <Route path="/departments/:department">
                    <Departments/>
                </Route>
                <Route path="/search">
                    <Searchcity/>
                </Route>
                <Route path="/mylocations">
                    <MyLocations/>
                </Route>
                <Route path="/mypreferences">
                    <MyPreferences/>
                </Route>
                <Route path="/profile">
                    {isAuthenticated ? <Profile/> : <Redirect to="/"/>}
                </Route>
                <Route path="/signin">
                    <SignIn/>
                </Route>
                <Route path="/signup">
                    <SignUp/>
                </Route>
                <Route path="/">
                    <Home/>
                </Route>

            </Switch>
            <Footer/>
        </>
    );
}

export default App;
