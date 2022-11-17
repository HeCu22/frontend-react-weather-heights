import React, {useState, useEffect} from "react";
import './Compare.css';

function Compare(mylocations,tempmin,tempmax) {
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const lines = [{
        city: "",
        tempmin: 0,
        tempmax: 0,
    }];


    useEffect (() => {
        if  (mylocations.length > 0) {
            mylocations.map((location,index) => {
                if (index < 10) {
                    fetchLocationData(locationKey,location,setLocation,error, toggleError, loading, toggleLoading) ;
                toggleLoading(false);
                }

            })
        }
    },[]);






    return (
        <>
        </>
    );
}

export default Compare;