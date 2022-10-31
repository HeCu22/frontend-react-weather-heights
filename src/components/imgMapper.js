import im01 from "../assets/images/impression01.jpg";
import im13 from "../assets/images/impression13.jpg";
import im21 from "../assets/images/impression21.jpg";
import im31 from "../assets/images/impression31.jpg";
import React from "react";

function ImgMapper({imCode,description}) {
    switch (imCode) {
        case "im01":
            return <img className="small-picture-img"src={im01} alt={description}/>;
        case "im13":
            return <img className="small-picture-img" src={im13} alt={description}/>;
        case "im21":
            return <img className="small-picture-img"src={im21} alt={description}/>;
        case "im31":
            return <img className="small-picture-img" src={im31} alt={description}/>;
        default:
            return <img src="src/components/imgMapper" alt={""}/>
    }
}

export default ImgMapper;