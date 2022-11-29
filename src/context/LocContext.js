import React, {createContext, useEffect, useState} from 'react';

export const LocContext = createContext({})

function LocContextProvider({children}) {
    const [myLocs, setMyLocs] = useState([{}]
    );

    useEffect(() => {
        console.log('de contextLoc is zojuist opnieuw opgestart');
        if (JSON.parse(localStorage["weatherheightsMyLocations"] || null)) {
            const locationsInStorage = JSON.parse(localStorage.getItem('weatherheightsMyLocations'));
            console.log('locationsInStorage', locationsInStorage[0]);
            if (!locationsInStorage[0].key) {
                const scrollArray = locationsInStorage.shift();
                console.log('scroll', scrollArray, 'myloc', locationsInStorage);
            }
            if (locationsInStorage) {
                setMyLocs(locationsInStorage);
            }
        }


    }, []);  // <--- mounting;

    function setFavLoc(mylocations) {
        setMyLocs(mylocations);
        localStorage.setItem('weatherheightsMyLocations', JSON.stringify(mylocations));
    }

    const locContextData = {
        favLocations: myLocs,
        setFavLocFunction: setFavLoc,
    }
    return (
        <LocContext.Provider value={locContextData}>
            {children}
        </LocContext.Provider>
    );
}

export default LocContextProvider;