import React, {useEffect, useState} from 'react';
import './SortedList.css';

function SortedList({templist, citylist, tempmin, tempmax}) {
    const [topList, setToplist] = useState(null);
    console.log('propS', templist, citylist, tempmin, tempmax);

    useEffect(() => {


        const arrayList = templist.map((record, index) => {
            return ({temp: record, city: citylist[index]});
        });
        const resultfilter = arrayList.filter((record) => {
            return record.temp > tempmin && record.temp < tempmax;
        })
        const result = resultfilter.sort((a, b) => a.tempmax - b.tempmax);
        setToplist(result);
        console.log('array', result);

    }, []);

    return (
        <>

            {topList && topList.map((record, index) => {

                const currentDay = new Date();
                const currentMoment = currentDay.getTime();
                const recordkey = record.city.concat(currentMoment);
                return (
                    <div className="compare-grid" key={recordkey}>

                        <p> {record.city} 0/ {record.temp} </p>
                    </div>
                )
            })
            }
        </>
    );
}

export default SortedList;