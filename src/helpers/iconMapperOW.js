import React from "react";
import {ReactComponent as Sun} from "../assets/icons/weather-icon1.svg";
import {ReactComponent as SunCloud} from "../assets/icons/weather-icon3.svg";
import {ReactComponent as SunClouds} from "../assets/icons/weather-icon6.svg";
import {ReactComponent as Clouds} from "../assets/icons/weather-icon7.svg";
import {ReactComponent as Rain} from "../assets/icons/weather-icon18.svg";
import {ReactComponent as Showers} from "../assets/icons/weather-icon12.svg";
import {ReactComponent as Clear} from "../assets/icons/weather-icon33.svg";


function iconMapperOW(iconCode) {
    switch (iconCode) {
                case '01d':
                    return <Sun/>;
                case '02d':
                    return <SunCloud/>;
                case '04d':
                    return <SunCloud/>
                case "50d":
                    return <Rain/>
                default:
                    return <Clouds/>;
            }
 }
export default iconMapperOW;