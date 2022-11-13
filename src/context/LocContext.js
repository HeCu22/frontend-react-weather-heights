import React, {createContext, useState} from 'react';

export const LocContext = createContext({})

function LocContextProvider({children}) {
    const [myLocs, setMyLoc] = useState([]);

    function setFavLoc(mylocations) {
       setMyLoc(mylocations);
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