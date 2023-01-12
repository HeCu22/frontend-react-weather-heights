import im00 from "../assets/images/impression00.png";
import im01 from "../assets/images/impression01.jpg";
import im03 from "../assets/images/impression03.jpg";
import im04 from "../assets/images/impression04.jpg";
import im07 from "../assets/images/impression07.jpg";
import im09 from "../assets/images/impression09.jpg";
import im12 from "../assets/images/impression12.jpg";
import im11 from "../assets/images/impression11.jpg";
import im13 from "../assets/images/impression13.jpg";
import im16 from "../assets/images/impression16.jpg";
import im17 from "../assets/images/impression17.jpg";
import im19 from "../assets/images/impression19.jpg";
import im18 from "../assets/images/impression18.jpg";
import im21 from "../assets/images/impression21.png";
import im23 from "../assets/images/impression23.jpg";
import im25 from "../assets/images/impression25.jpg";
import im24 from "../assets/images/impression24.jpg";
import im26 from "../assets/images/impression26.jpg";
import im28 from "../assets/images/impression28.jpg";
import im29 from "../assets/images/impression29.jpg";
import im30 from "../assets/images/impression30.jpg";
import im31 from "../assets/images/impression31.png";
import im34 from "../assets/images/impression34.png";
import im35 from "../assets/images/impression35.jpg";
import im36 from "../assets/images/impression36.png";
import im37 from "../assets/images/impression37.png";
import im39 from "../assets/images/impression39.jpg";
import im40 from "../assets/images/impression40.jpg";
import im41 from "../assets/images/impression41.jpg";
import im44 from "../assets/images/impression44.jpg";
import im46 from "../assets/images/impression46.jpg";
import im47 from "../assets/images/impression47.jpg";
import im49 from "../assets/images/impression49.jpg";
import im56 from "../assets/images/impression56.jpg";
import im58 from "../assets/images/impression58.jpg";
import im63 from "../assets/images/impression63.jpg";
import im64 from "../assets/images/impression64.jpg";
import im71 from "../assets/images/impression71.jpg";
import im73 from "../assets/images/impression73.jpg";
import im75 from "../assets/images/impression75.jpg";
import im83 from "../assets/images/impression83.jpg";
import im84 from "../assets/images/impression84.png";
import im85 from "../assets/images/impression85.jpg";
import im86 from "../assets/images/impression86.jpg";
import im87 from "../assets/images/impression87.jpg";
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

function ImgMapper({imCode, description}) {
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
            return <img className="small-picture-img" src={im01} alt={description}/>;
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
            return <img className="small-picture-img" src={im12} alt={description}/>;
        case "im13":
            return <img className="small-picture-img" src={im13} alt={description}/>;
        // case "im14":
        // case "im15":
        case "im16":
            return <img className="small-picture-img" src={im16} alt={description}/>;
        case "im17":
            return <img className="small-picture-img" src={im17} alt={description}/>;
        case "im18":
            return <img className="small-picture-img" src={im18} alt={description}/>;
        case "im19":
            return <img className="small-picture-img" src={im19} alt={description}/>;
        case "im20":
        case "im21":

            return <><img className="small-picture-img" src={im21} alt={description}/></>;

        case "im29":
            return <img className="small-picture-img" src={im29} alt={description}/>
        case "im35":
            return <img className="small-picture-img" src={im35} alt={description}/>;
        case "im23":
            return <img className="small-picture-img" src={im23} alt={description}/>;
        case "im24":
            return <img className="small-picture-img" src={im24} alt={description}/>;
        case "im25":
            return <img className="small-picture-img" src={im25} alt={description}/>;
        case "im26":
            return <img className="small-picture-img" src={im26} alt={description}/>;
        case "im27":
        case "im28":
            return <img className="small-picture-img" src={im28} alt={description}/>;

        case "im30":
            return <img className="small-picture-img" src={im30} alt={description}/>;
        case "im31":
            return <img className="small-picture-img" src={im31} alt={description}/>;
        case "im32":
        case "im33":
        case "im34":
            return <img className="small-picture-img" src={im34} alt={description}/>;
        case "im36":
            return <img className="small-picture-img" src={im36} alt={description}/>;
        case "im37":
            return <img className="small-picture-img" src={im37} alt={description}/>;
        case "im38":
        case "im39":
            return <img className="small-picture-img" src={im39} alt={description}/>;
        case "im40":
            return <img className="small-picture-img" src={im40} alt={description}/>;
        case "im41":
            return <img className="small-picture-img" src={im41} alt={description}/>;
        case "im42":
        case "im43":
        case "im44":
            return <img className="small-picture-img" src={im44} alt={description}/>;
        case "im45":
        case "im46":
            return <img className="small-picture-img" src={im46} alt={description}/>;
        case "im47":
            return <img className="small-picture-img" src={im47} alt={description}/>;
        case "im48":
        case "im49":
            return <img className="small-picture-img" src={im49} alt={description}/>;
        case "im50":
        case "im51":
        case "im52":
        case "im53":
        case "im54":
        case "im55":
        case "im22":
        case "im56":
            return <img className="small-picture-img" src={im56} alt={description}/>;
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
            return <img className="small-picture-img" src={im64} alt={description}/>;
        case "im65":
        case "im66":
        case "im67":
        case "im68":
        case "im69":
        case "im70":
        case "im71":
            return <img className="small-picture-img" src={im71} alt={description}/>;
        case "im72":
        case "im73":
            return <img className="small-picture-img" src={im73} alt={description}/>;
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
            return <img className="small-picture-img" src={im83} alt={description}/>;
        case "im84":
            return <img className="small-picture-img" src={im84} alt={description}/>
        case "im85":
            return <img className="small-picture-img" src={im85} alt={description}/>;
        case "im86":
            return <img className="small-picture-img" src={im86} alt={description}/>;
        case "im87":
            return <img className="small-picture-img" src={im87} alt={description}/>;
        default:
            return <img className="small-picture-img" src={im00} alt="France"/>;
    }
}

export default ImgMapper;