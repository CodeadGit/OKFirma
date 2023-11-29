import React, { useContext, useEffect, useState } from "react";
import "./navbar.scss";
import WidgetNew from "./Widget";
import Time from "./svg/time.svg";
import WhiteTime from "./svg/whiteTime.svg";
import Check from "./svg/check.svg";
import WhiteCheck from "./svg/whiteCheck.svg";
import Cat from "./svg/cat.svg";
import WhiteCat from "./svg/whiteCat.svg";
import Kalite from "./svg/kalite.svg";
import { CloudContext } from "../../context/cloud.context";

import { AuthenticationContext } from "../../context/authentication.context";

function WidgetsContainer() {
  const { myPossibleJobs, myJobsData, favoriArea } = useContext(CloudContext);
  const { userData } = useContext(AuthenticationContext);

  function mode(array) {
    if (array.length == 0) return null;
    var modeMap = {};
    var maxEl = array[0],
      maxCount = 1;
    for (var i = 0; i < array.length; i++) {
      var el = array[i];
      if (modeMap[el] == null) modeMap[el] = 1;
      else modeMap[el]++;
      if (modeMap[el] > maxCount) {
        maxEl = el;
        maxCount = modeMap[el];
      }
    }
    return maxEl;
  }

  const widgetData = [
    {
      svg: Time,
      altsvg: WhiteTime,
      label: "Yeni Keşif Fırsatları",
      render: `${myPossibleJobs.length}`,
      full: true,
      style: "big",
      id: "first",
      className: "narrow",
      link: "/kesifler",
      linkable: true,
    },
    {
      svg: Check,
      altsvg: WhiteCheck,
      label: "Keşiflerim",
      render: `${myJobsData.length}`,
      full: true,
      style: "big",
      id: "second",
      className: "narrow",
      link: "/kesiflerim",
      linkable: true,
    },
    {
      svg: Cat,
      altsvg: WhiteCat,
      label: "Favori Kategori",
      render: `${favoriArea.filter((i) => i === mode(favoriArea))[0]}`,
      full: true,
      style: "big",
      id: "third",
      className: "text",
      link: "/",
      linkable: false,
    },
    {
      svg: Kalite,
      altsvg: Kalite,
      label: "kalitepuanı.com'daki Puanınız baz alınmıştır.",
      render: `${userData.KPU?userData.KPU:"belirtilmemiş"}`,
      full: false,
      style: "small",
      id: "fourth",
      className: "wide",
      link: "/",
      linkable: false,
    },
  ];

  return (
    <div className="widgetContainer">
      {widgetData.map((i) => {
        return <WidgetNew key={i.id} item={i} />;
      })}
    </div>
  );
}

export default WidgetsContainer;
