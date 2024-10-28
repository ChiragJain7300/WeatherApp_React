import React from "react";
import sun from "../assets/sun.png";
function Forecast({ wData }) {
  return (
    <div className="shadow-lg flex gap-2 flex-col rounded-md justify-center p-4 bg-lime-200 place-items-center">
      <p>{wData.date}</p>
      <img src={sun} alt="" width={32} />
      <p className="text-center">{wData.day.avgtemp_c}&deg; C</p>
    </div>
  );
}

export default Forecast;
