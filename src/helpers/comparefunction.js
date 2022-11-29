import React, {useState} from "react";
import fetchConditions from "./fetchConditions";
import test from '../data/compare.json';


function comparefunction(locations, compareResult, tempMax, tempMin, currConditions, setCurrConditions, error, toggleError, loading, toggleLoading) {
    // const [error, toggleError] = useState(false);
    // const [loading, toggleLoading] = useState(false);
    // const [currConditions, setCurrConditions] = useState(null);


    const conditions = test.map((record) => {
            return ({Temp: record.Temperature.Metric.Value});
        }
    );
    console.log('condition', conditions);

    const lastindex = locations.length;
    console.log(lastindex);

    compareResult = conditions.map((condition, index) => {
        return ({city: locations[index], tempmax: condition.Temp, tempmin: 0});
    });

    console.log('compare', compareResult);

    // fetchConditions((location), currConditions, setCurrConditions, error, toggleError, loading, toggleLoading);
    // toggleLoading(false);
    // setCurrConditions(test[i]);

const result = compareResult.sort((a,b) => a.tempmax - b.tempmax);
    console.log('sort', result);


    return result[0].tempmax + result[1].tempmax;

}

export default comparefunction;