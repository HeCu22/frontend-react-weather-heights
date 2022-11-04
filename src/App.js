import React, {useContext} from "react";
import { Route, Switch, Redirect } from 'react-router-dom';
import {AuthContext} from "./context/AuthContext";
import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import Profile from "./pages/Profile";
import MyLocations from "./pages/mylocations/MyLocations";
import Topnav from "./components/topnav/Topnav";
import Home from './pages/home/Home';
import LocationDetails from './pages/locationDetails/LocationDetails';
import './App.css';
import Searchcity from "./pages/searchcity/Searchcity";
import Citydetails from "./pages/citydetails/Citydetails";

function App() {
  const {isAuthenticated} = useContext(AuthContext);
  return (
    <>
    <Topnav/>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/search">
         <Searchcity/>
        </Route>
        <Route path="/details/:city">
          <Citydetails />
        </Route>
        <Route path="/location-details/:key">
          <LocationDetails />
        </Route>
        <Route path="/mylocations">
          {isAuthenticated ? <MyLocations /> : <Redirect to="/" />}
        </Route>
        <Route path="/profile">
          {isAuthenticated ? <Profile /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/signin">
          <SignIn/>
        </Route>
        <Route exact path="/signup">
          <SignUp/>
        </Route>

      </Switch>
    </>
  );
}

export default App;
