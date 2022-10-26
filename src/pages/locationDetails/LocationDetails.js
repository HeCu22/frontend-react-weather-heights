import React, {useEffect, useState} from 'react';
import './LocationDetails.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function LocationDetails() {
    const { key } = useParams();
    const [joke,setJoke] = useState(null);

    useEffect(() => {
        async function getLocationDetails() {
            try {
              const {data} = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=${process.env.REACT_APP_API_KEY}&details=true`);

                console.log((data[0]));

               console.log((data[0].CloudCover));
                setJoke((data[0]));

            } catch(e) {
                console.error(e);
            }
        }

        getLocationDetails();
    }, []);

    return (
        <div>

            <h1>Dit is de categorie detail pagina</h1>
            <h2>Het gaat over de categorie: {key}</h2>
            <p>Cloudcover: {joke.CloudCover}</p>
        </div>
    );
}

export default LocationDetails;