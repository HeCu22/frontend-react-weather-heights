import React from "react";
import {ReactComponent as Sun} from "../assets/icons/sun.svg";
import {ReactComponent as SunCloud} from "../assets/icons/sunsmallcloud.svg";
import {ReactComponent as SunClouds} from "../assets/icons/sunbehindcloud.svg";
import {ReactComponent as Clouds} from "../assets/icons/clouds.svg";
import {ReactComponent as Rain} from "../assets/icons/rain.svg";
import {ReactComponent as Showers} from "../assets/icons/sun-rain.svg";
import {ReactComponent as Clear} from "../assets/icons/clear.svg";


function iconMapperOW(iconCode) {
    switch (iconCode) {
        case '01d':
            return <Sun/>;
        case '01n':
            return <Clear/>;
        case '02d':
            return <SunCloud/>;
        case '04d':
            return <SunCloud/>
        case "50d":
        case "50n":
            return <Rain/>
        default:
            return <Clouds/>;
    }
}

export default iconMapperOW;