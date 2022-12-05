import React, {useEffect, useState} from 'react';
import './SortedList.css';

function SortedList({templist, windlist, rainlist, citylist, state}) {
    const [topList, setToplist] = useState(null);

    const currentDay = new Date();
    console.log('Sorted List', currentDay);
    console.log('propS', templist, citylist, state);


    const arrayList = templist.map((record, index) => {
        return ({temp: record, city: citylist[index], wind: windlist[index], rain: rainlist[index]});
    })
    console.log('arraylist', arrayList);


    function filter(list) {
        const filter = list.filter((record) => {
            return record.temp > state.tempmin && record.temp < state.tempmax && record.wind < state.windkmh && record.rain < state.rainmm;
        })

        const currentDay = new Date();
        console.log('Filter', currentDay);
        console.log('filter', filter)
        return filter;
    }

    function sort(list) {
        const result = list.sort((a, b) => a.tempmax - b.tempmax)
        const currentDay = new Date();
        console.log('sort', currentDay);
        console.log('sort result', result);
        return result;
    }


    useEffect(() => {
        console.log('useeffect sort mount');
        const resultfilter = filter(arrayList);
        setToplist(resultfilter);

        if ((state.tempsort)) {
            const result = sort(resultfilter);
            setToplist(result)
        }

    }, []);

    // useEffect(() => {
    //     console.log('useeffect sort update');
    //     const resultfilter = filter(arrayList);
    //     setToplist(resultfilter);
    //
    //     if ((state.tempsort)) {
    //         const result = sort(resultfilter);
    //         setToplist(result)
    //     }
    //
    // }, [(state)]);

    return (
        <>

            {topList && Object.keys(topList).length > 0 && topList.map((record, index) => {

                const currentDay = new Date();
                const currentMoment = currentDay.getTime();
                const recordkey = record.city.concat(currentMoment);
                return (
                    <div className="compare-grid" key={recordkey}>

                        <p> {record.city} 0/ {record.temp} {record.rain} {record.wind}</p>
                    </div>
                )
            })
            }
        </>
    );
}

export default SortedList;