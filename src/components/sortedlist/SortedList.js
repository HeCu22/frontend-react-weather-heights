import React, {useContext, useEffect, useState} from 'react';
import './SortedList.css';
import iconMapper from "../../helpers/iconMapper";
import {LocContext} from "../../context/LocContext";


function SortedList({lines, state, counter, setCounter}) {
    const {favLocations, setFavLocFunction} = useContext(LocContext);
    const [topList, setToplist] = useState(null);

    const arrayList = lines;


    function filter(list) {

        const filter = list.filter((record) => {
            return record.temp > state.tempmin && record.temp < state.tempmax && record.wind <= state.windkmh && record.rain <= state.rainmm;
        })

        return filter;
    }

    function sort(list) {
        // const result = list.sort((a, b) => a.tempmax - b.tempmax)
        const result = list;

        const sortall = result.sort((a, b) => {
            if (state.tempsort) {
                if (a.temp > b.temp) {
                    return -1;
                }
                if (a.temp < b.temp) {
                    return 1;
                }
            }

            // temp must be equal
            if (state.rainsort) {
                if (a.rain > b.rain) {
                    return 1;
                }
                if (a.rain < b.rain) {
                    return -1;
                }
            }

            // rain must be equal
            if (state.windsort) {
                if (a.wind > b.wind) {
                    return 1;
                }
                if (a.wind < b.wind) {
                    return -1;
                }
            }

            // wind must be equal
            return 0;

        });

        return sortall;

    }


    useEffect(() => {


        const resultfilter = filter(arrayList);
        setToplist(resultfilter);

        const resultsort = sort(resultfilter);
        setToplist(resultsort)
        const newFavLoc = resultsort.map((newrec) => {
            return ({key: newrec.key, city: newrec.city});
        })
        // optie om mylocations pook te sorteren achterwege gelaten voor deze versie
       // setFavLocFunction(newFavLoc);
        console.log('new', newFavLoc);
    }, [counter, state]);

    return (
        <>

            {topList && Object.keys(topList).length > 0 && topList.map((recordline, index) => {
                if (index < 5) {
                    return (

                        <div className="compare-grid" key={recordline.key}>

                            <div className="compare-sub-grid">
                                <p> {recordline.city} </p>
                                <p className="pictures"><span
                                    className="small-span"> {iconMapper(recordline.icon)} </span>
                                </p>
                                <p className="small-text"> {recordline.description}</p>
                            </div>
                            <div className="column">
                                <div className="compare-sub-header">
                                    <p><span>Min/Max °C</span></p>
                                    <p>Rain mm</p>
                                    <p>Wind km/h</p>
                                    <p>Sun hrs</p>
                                    <p>Air quality</p>
                                </div>
                                <div className="compare-sub-grid">

                                    <p><span className="temp">{recordline.tempmin} / {recordline.temp} </span></p>
                                    <p className="rain"> {recordline.rain.toFixed(1)} </p>
                                    <p> {recordline.winddirection} {recordline.wind}/{recordline.windgust}</p>
                                    <p> {recordline.sunhrs}</p>
                                    <p> {recordline.airqual}
                                    </p>

                                </div>
                            </div>
                        </div>
                    )
                }
            })
            }
        </>
    );
}

export default SortedList;