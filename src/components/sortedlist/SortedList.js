import React, {useEffect, useState} from 'react';
import './SortedList.css';
import iconMapperOW from "../../helpers/iconMapperOW";


function SortedList({lines, state, counter, setCounter}) {
    const [topList, setToplist] = useState(null);

    const currentDay = new Date();
    console.log('Sorted List', currentDay);
    console.log('props sorted list', lines, state);


    const arrayList = lines;

    console.log('arraylist', arrayList);
    console.log('state', state);


    function filter(list) {
        console.log('list', list);
        const filter = list.filter((record) => {
            console.log('record', record);
            return record.temp > state.tempmin && record.temp < state.tempmax && record.wind <= state.windkmh;  /* && record.rain <= state.rainmm; */
        })
        console.log('filter', filter);
        return filter;
    }

    function sort(list) {
        const result = list.sort((a, b) => a.tempmax - b.tempmax)


        const sortall = result.sort((a, b) => {
            if (state.tempsort) {
                if (a.temp > b.temp) {
                    return -1;
                }
                if (a.temp < b.temp) {
                    return 1;
                }
            }

            // temp mut be equal
            if (state.rainsort) {
                if (a.rain > b.rain) {
                    return -1;
                }
                if (a.rain < b.rain) {
                    return 1;
                }
            }

            // rain must be equal
            if (state.windsort) {
                if (a.wind > b.wind) {
                    return -1;
                }
                if (a.wind < b.wind) {
                    return 1;
                }
            }

            // wind must be equal
            return 0;

        });

        return sortall;

    }


    useEffect(() => {
        console.log('♻️ Ik ben geupdate in SortedList');
        if (counter > 6) {
            console.log('🍓 Ik ben hoger dan 6!');
        }

        const resultfilter = filter(arrayList);
        setToplist(resultfilter);

        const resultsort = sort(resultfilter);
        setToplist(resultsort);


    }, [counter, state]);

    return (
        <>

            {topList && Object.keys(topList).length > 0 && topList.map((recordline, index) => {

                return (
                    <div className="compare-grid" key={recordline.key}>

                        <p> {recordline.city} {iconMapperOW(recordline.icon)} {recordline.tempmin} / {recordline.temp} {recordline.rain} {recordline.winddirection} {recordline.wind} {recordline.description}</p>
                    </div>
                )
            })
            }
        </>
    );
}

export default SortedList;