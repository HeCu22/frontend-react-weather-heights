import React from "react";
import {ReactComponent as Sun} from "../assets/icons/sun.svg";
import {ReactComponent as SunCloud} from "../assets/icons/sunsmallcloud.svg";
import {ReactComponent as SunClouds} from "../assets/icons/sunbehindcloud.svg";
import {ReactComponent as Clouds} from "../assets/icons/clouds.svg";
import {ReactComponent as Rain} from "../assets/icons/rain.svg";
import {ReactComponent as Showers} from "../assets/icons/sun-rain.svg";
import {ReactComponent as Clear} from "../assets/icons/clear.svg";
import {ReactComponent as Snow} from "../assets/icons/snow.svg";

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
        case 22:
            return <Snow/>
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