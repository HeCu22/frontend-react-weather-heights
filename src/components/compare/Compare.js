import React, {useState, useEffect} from "react";
import fetchTemp from "../../helpers/fetchTemp";
import './Compare.css';
import test from "../../data/compare.json";
import iconMapper from "../../helpers/iconMapper";
import axios from "axios";


function Compare({mylocations, tempmin, tempmax}) {
    console.log('campare', mylocations);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [lines, setLines] = useState([]);


    // testing purposes
    // const conditions = test.map((record) => {
    //         return ({Temp: record.Temperature.Metric.Value});
    //     }
    // );
    // const compareResult = conditions.map((condition, index) => {
    //     return ({city: mylocations[index], tempmax: condition.Temp, tempmin: 0});
    // });
    let temp2 = [];
    useEffect(() => {
        console.log('useeffect')

        async function fetchTemp(locationKey) {


            console.log('fetchconditions')
            try {
                toggleError(false);
                // const {data: [databack]} = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${process.env.REACT_APP_API_KEY}&details=true`);
                // temp2 = databack.Temperature.Metric.Value;
                temp2 = [10.5, 20, 15, 13, 18, 21, 18, 15, 5, 9];
                console.log(temp2);

                // setCurrConditions((databack));
            } catch (e) {
                console.error(e);

            }
            // return temp2;
        }

        console.log('temp2', temp2);

        if (mylocations.length > 0) {
            console.log('myloc', mylocations);
            const compareResult2 = mylocations.map((location, index) => {
                    console.log('location', location);
                    if (index < 10 && location) {
                        console.log('location', location);
                        // const temp2 = fetchTemp((location), currConditions, setCurrConditions, error, toggleError, loading, toggleLoading);
                        // console.log('temp2', temp2);
                        // console.log('cur', currConditions);
                        // const temp3 = temp2;


                        // for testing purposes
                        // console.log('test', test[index]);
                        // switch (index) {
                        //     case 0:
                        //         return ({city: mylocations[index], tempmax: test[0].Temperature.Metric.Value, tempmin: 0});
                        //     case 1:
                        //         return ({city: mylocations[index], tempmax: test[1].Temperature.Metric.Value, tempmin: 0});
                        //     case 2:
                        //         return ({city: mylocations[index], tempmax: test[2].Temperature.Metric.Value, tempmin: 0});
                        //     default:
                        //         return ({city: mylocations[index], tempmax: test[0].Temperature.Metric.Value, tempmin: 0});
                        // }
                        fetchTemp(mylocations[index]);
                        console.log('temp2', temp2);
                        return ({city: mylocations[index], tempmax: temp2[index], tempmin: 0});

                        // array[index].city = (currConditions.Key);
                        // array[index].tempmax = (currConditions.Temperature.Metric.Value);
                    }

                }
            )

            console.log(compareResult2);

            const result = compareResult2.sort((a, b) => b.tempmax - a.tempmax);
            console.log('sort', result);


            setLines(result);

        }


    }, [mylocations]);


    return (
        <>

            <div className="compare-header">
                <h5>Comparison</h5>
                <p>Min/Max °C</p>
                <p>Rain mm</p>
                <p>Wind km/h</p>
                <p>Sun hrs UV</p>
                <p>Air quality</p>

            </div>
            {lines &&
                <>
                    {lines.length > 0 && lines.map((record, index) => {
                        if (index > 5) {
                            return (
                                <div className="compare-grid" key={record.city}>
                                    <p> {record.city} </p>
                                    <p> {record.tempmax} </p>
                                    <p> {record.tempmin} </p>
                                </div>

                            )
                        }

                        ;
                    })}
                </>
            }
        </>
    );
}

export default Compare;