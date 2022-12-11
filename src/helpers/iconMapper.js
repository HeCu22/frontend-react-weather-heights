import React from "react";
import {ReactComponent as Sun} from "../assets/icons/weather-icon1.svg";
import {ReactComponent as SunCloud} from "../assets/icons/weather-icon3.svg";
import {ReactComponent as SunClouds} from "../assets/icons/weather-icon6.svg";
import {ReactComponent as Clouds} from "../assets/icons/weather-icon7.svg";
import {ReactComponent as Rain} from "../assets/icons/weather-icon18.svg";
import {ReactComponent as Showers} from "../assets/icons/weather-icon12.svg";
import {ReactComponent as Clear} from "../assets/icons/weather-icon33.svg";


function iconMapper(iconCode) {
    switch (iconCode) {
        case 33:
        case 34:
        case 35:
        case 36:
            return <Clear/>;
        case 1:
        case 5:
            return <Sun/>;
        case 2:
        case 3:
        case 21:
        case 30:
            return <SunCloud/>;
        case 4:
        case 6:
        case 20:
        case 23:
            return <SunClouds/>;
        case 12:
        case 13:
        case 14:
        case 17:
        case 39:
        case 40:
        case 41:
        case 42:
            return <Showers/>;
        case 18:
        case 15:
        case 29:
            return <Rain/>;
        default:
            return <Clouds/>;
    }
}

export default iconMapper;