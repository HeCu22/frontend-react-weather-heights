import React from 'react';
import './LocationItem.css';
import { Link } from 'react-router-dom';

function LocationItem({ key, name, geopos, buttonType, clickHandler }) {

  return (
    <li>
      <h2>{name}</h2>
        <p>{geopos}</p>
      <Link to={`/location-details/${name}`}>Naar de detailpagina</Link>
      <button
        type={buttonType}
        onClick={clickHandler}
      >
        Like
      </button>
    </li>
  );
}

export default LocationItem;