import React, {useEffect, useState} from 'react';
import './SortedList.css';

function SortedList({templist, citylist}) {
    const [topList, setToplist] = useState(null);

    const arrayList = templist.map((record, index) => {
        return ({temp: record, city: citylist[index]});
    });
    const result = arrayList.sort((a, b) => b.tempmax - a.tempmax);
    setToplist(result);
    console.log('array', result);


    return (
        <>

            {topList && topList.map((record, index) => {

                return (
                    <div className="compare-grid" key={record.city}>

                        <p> {record.city} 0/ {record.temp} </p>
                    </div>
                )
            })
            }
        </>
    );
}

export default SortedList;