import im00 from "../assets/images/impression00.png";
import im01 from "../assets/images/impression01.jpg";
import im04 from "../assets/images/impression04.jpg";
import im07 from "../assets/images/impression07.jpg";
import im09 from "../assets/images/impression09.jpg";
import im11 from "../assets/images/impression11.jpg";
import im13 from "../assets/images/impression13.jpg";
import im21 from "../assets/images/impression21.jpg";
import im22 from "../assets/images/impression22.jpg";
import im25 from "../assets/images/impression25.jpg";
import im26 from "../assets/images/impression26.jpg";
import im30 from "../assets/images/impression30.jpg";
import im31 from "../assets/images/impression31.jpg";
import im39 from "../assets/images/impression39.jpg";
import im44 from "../assets/images/impression44.jpg";
import im58 from "../assets/images/impression58.jpg";
import im63 from "../assets/images/impression63.jpg";
import im75 from "../assets/images/impression75.jpg";
import im84 from "../assets/images/impression84.jpg";
import ara from "../assets/images/ara.png";
import bre from "../assets/images/bre.png";
import bfc from "../assets/images/bfc.png";
import cvl from "../assets/images/cvl.png";
import ges from "../assets/images/ges.png";
import hdf from "../assets/images/hdf.png";
import idf from "../assets/images/idf.png";
import naq from "../assets/images/naq.png";
import nor from "../assets/images/nor.png";
import occ from "../assets/images/occ.png";
import pac from "../assets/images/pac.png";
import pdl from "../assets/images/pdl.png";


import React from "react";

function ImgMapper({imCode,description}) {
    switch (imCode) {
        case "imFR-ARA":
            return <img className="small-picture-img" src={ara} alt={description}/>;
        case "imFR-BRE":
            return <img className="small-picture-img" src={bre} alt={description}/>;
        case "imFR-BFC":
            return <img className="small-picture-img" src={bfc} alt={description}/>;
        case "imFR-CVL":
            return <img className="small-picture-img" src={cvl} alt={description}/>;
        case "imFR-GES":
            return <img className="small-picture-img" src={ges} alt={description}/>;
        case "imFR-HDF":
            return <img className="small-picture-img" src={hdf} alt={description}/>;
        case "imFR-IDF":
            return <img className="small-picture-img" src={idf} alt={description}/>;
        case "imFR-NAQ":
            return <img className="small-picture-img" src={naq} alt={description}/>;
        case "imFR-NOR":
            return <img className="small-picture-img" src={nor} alt={description}/>;
        case "imFR-OCC":
            return <img className="small-picture-img" src={occ} alt={description}/>;
        case "imFR-PAC":
            return <img className="small-picture-img" src={pac} alt={description}/>;
        case "imFR-PDL":
            return <img className="small-picture-img" src={pdl} alt={description}/>;
        case "im01":
        case "im02":
            return <img className="small-picture-img" src={im01} alt={description}/>;
        case "im03":
        case "im04":
            return <img className="small-picture-img" src={im04} alt={description}/>;
        case "im05":
        case "im06":
        case "im07":
            return <img className="small-picture-img" src={im07} alt={description}/>;
        case "im08":
        case "im09":
            return <img className="small-picture-img" src={im09} alt={description}/>;
        case "im10":
        case "im11":
            return <img className="small-picture-img" src={im11} alt={description}/>;
        case "im12":
        case "im13":
            return <img className="small-picture-img" src={im13} alt={description}/>;
        case "im14":
        case "im15":
        case "im16":
        case "im17":
        case "im18":
        case "im19":
        case "im20":
        case "im21":
            return <img className="small-picture-img" src={im21} alt={description}/>;
        case "im22":
            return <img className="small-picture-img" src={im22} alt={description}/>;
        case "im23":
        case "im24":
        case "im25":
            return <img className="small-picture-img" src={im25} alt={description}/>;
        case "im26":
            return <img className="small-picture-img" src={im26} alt={description}/>;
        case "im27":
        case "im28":
        case "im29":
        case "im30":
            return <img className="small-picture-img" src={im30} alt={description}/>;
        case "im31":
            return <img className="small-picture-img" src={im31} alt={description}/>;
        case "im32":
        case "im33":
        case "im34":
        case "im35":
        case "im36":
        case "im37":
        case "im38":
        case "im39":
            return <img className="small-picture-img" src={im39} alt={description}/>;
        case "im40":
        case "im41":
        case "im42":
        case "im43":
        case "im44":
            return <img className="small-picture-img" src={im44} alt={description}/>;
        case "im45":
        case "im46":
        case "im47":
        case "im48":
        case "im49":
        case "im50":
        case "im51":
        case "im52":
        case "im53":
        case "im54":
        case "im55":
        case "im56":
        case "im57":
        case "im58":
            return <img className="small-picture-img" src={im58} alt={description}/>;
        case "im59":
        case "im60":
        case "im61":
        case "im62":
        case "im63":
            return <img className="small-picture-img" src={im63} alt={description}/>;
        case "im64":
        case "im65":
        case "im66":
        case "im67":
        case "im68":
        case "im69":
        case "im70":
        case "im71":
        case "im72":
        case "im73":
        case "im74":
        case "im75":
            return <img className="small-picture-img" src={im75} alt={description}/>;
        case "im76":
        case "im77":
        case "im78":
        case "im79":
        case "im80":
        case "im81":
        case "im82":
        case "im83":
        case "im84":
            return <img className="small-picture-img" src={im84} alt={description}/>;
        default:
            return <img className="small-picture-img"  src={im00} alt="France"/>;
    }
}

export default ImgMapper;