import React, {useEffect, useState} from "react";
import { Route, Switch } from 'react-router-dom';
import Home from './pages/home/Home';
import LocationDetails from './pages/locationDetails/LocationDetails';
import './App.css';

function App() {
  return (
    <>
        <header className="outer-container top-nav-background">
            <div className="inner-container">

                <div className="top-navigation">
                    <nav className="top-nav-menu">
                        <ul>
                            <li>myLocations</li>
                            <li>myPreferences</li>
                            <li>Profile</li>
                            <li>Login</li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>



      <Switch>
        <Route exact path="/">
          <Home />
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
