import React, {useEffect, useState} from "react";
import { Route, Switch } from 'react-router-dom';
import Topnav from "./components/topnav/Topnav";
import Home from './pages/home/Home';
import LocationDetails from './pages/locationDetails/LocationDetails';
import './App.css';
import Searchcity from "./pages/searchcity/Searchcity";
import Citydetails from "./pages/citydetails/Citydetails";

function App() {
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
        <Route exact path="/location-details">
          <h2>Andere pagina</h2>
        </Route>
        <Route path="/location-details/:key">
          <LocationDetails />
        </Route>
      </Switch>
    </>
  );
}

export default App;
