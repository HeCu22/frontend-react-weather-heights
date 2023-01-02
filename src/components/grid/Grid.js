import React, {useContext, useEffect} from 'react';
import './Grid.css';
import iconMapper from "../../helpers/iconMapper";
import {LocContext} from "../../context/LocContext";

function Grid(lines) {

    const {favLocations, setFavLocFunction} = useContext(LocContext);

    useEffect(() => {



    }, []);

    return (
        <>
            {lines && Object.keys(favLocations).length > 0 && favLocations.map((recordline, index) => {

                return (
                    <div className="compare-grid" key={recordline.key}>

                        <div className="compare-sub-grid">
                            <p> {recordline.city} </p>
                            {/*<p className="pictures"><span*/}
                            {/*    className="small-span"> {iconMapper(recordline.icon)} </span>*/}
                            {/*</p>*/}
                            {/*<p className="small-text"> {recordline.description}</p>*/}
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

                                {/*<p> <span className="temp">{recordline.tempmin} / {recordline.temp} </span></p>*/}
                                {/*<p className="rain"> {recordline.rain.toFixed(1)} </p>*/}
                                {/*<p> {recordline.winddirection} {recordline.wind}/{recordline.windgust}</p>*/}
                                {/*<p> {recordline.sunhrs}</p>*/}
                                {/*<p> {recordline.airqual}*/}
                                {/*</p>*/}

                            </div>
                        </div>
                    </div>
                )
            })
            }
        </>
    );
}

export default Grid;