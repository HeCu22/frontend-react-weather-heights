import React, {createContext, useEffect, useState} from 'react';

export const LocContext = createContext({})

function LocContextProvider({children}) {
    const [myLocs, setMyLocs] = useState([{
        key: "",
        city: "",
    }
    ]);

    useEffect(() => {
        console.log('de contextLoc is zojuist opnieuw opgestart');
      if (JSON.parse(localStorage["weatherheightsMyLocations"] || null)) {
          const locationsInStorage = JSON.parse(localStorage.getItem('weatherheightsMyLocations'));
          console.log('locationsInStorage', locationsInStorage);
          if (locationsInStorage) {
              setMyLocs(locationsInStorage);
          }
      }


    }, []);  // <--- mounting;

    function setFavLoc(mylocations) {
        console.log('changelocs', mylocations);
       setMyLocs(mylocations);
       localStorage.setItem('weatherheightsMyLocations', JSON.stringify(mylocations));
    }

    const locContextData = {
        favLocations: myLocs.key,
        favCities: myLocs.city,
        setFavLocFunction: setFavLoc,
    }
    return (
        <LocContext.Provider value={locContextData}>
            {children}
        </LocContext.Provider>
    );
}

export default LocContextProvider;