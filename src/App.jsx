import { FaSearch } from "react-icons/fa";
import "./App.css";
import { useEffect, useState } from "react";
import sun from "./assets/sun.png";
import Forecast from "./components/Forecast";
function App() {
  const [location, setLocation] = useState("");
  const [apiLocation, setApiLocation] = useState("");
  const [currWeatherData, setCurrWeatherData] = useState({});
  const [foreWeatherData, setForeWeatherData] = useState([]);
  const searchWeather = (e) => {
    if (location === "") {
      alert("Empty values not allowed");
      return;
    }
    getWeatherData(location);
  };

  const getWeatherData = async (enteredLocation) => {
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${
      import.meta.env.VITE_API_KEY
    }&q=${enteredLocation || "Udaipur"}&days=4&aqi=no&alerts=no`;
    const res = await fetch(url);
    const resJson = await res.json();
    if (res && resJson) {
      setApiLocation(resJson.location.name);
      setCurrWeatherData(resJson.current);
      setForeWeatherData(resJson.forecast.forecastday);
    }
  };
  useEffect(() => {
    getWeatherData();
  }, []);
  console.log(currWeatherData);
  console.log(foreWeatherData);

  return (
    <>
      <div className="w-full min-h-screen pt-5">
        <h1 className="text-4xl tracking-wide text-center font-extrabold uppercase font-mono mb-6">
          Weather App
        </h1>

        <div className="text-center flex justify-center shadow-xl mb-10">
          <input
            type="text"
            placeholder="Enter the City...."
            className="min-w-[350px] w-1/2 py-3 px-5 rounded-l-lg"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            autoFocus
          />
          <button
            className="py-3 px-5 bg-pink-500 text-blue-800 font-bold rounded-r-lg hover:bg-pink-300"
            onClick={searchWeather}
          >
            <FaSearch size="20" />
          </button>
        </div>

        <div className="max-w-[650px] shadow-xl bg-lime-300 text-black rounded-md p-5 mx-auto flex flex-col place-items-center">
          <div className="w-full flex gap-10 mb-10 justify-center">
            <img src={sun} width="110px" />
            <div>
              <h2 className="text-xl">Today</h2>
              <h1 className="text-3xl font-bold mb-2">{apiLocation}</h1>
              <p>Temperature: {currWeatherData?.temp_c}&deg; C</p>
              <p>Humidity: {currWeatherData.humidity}</p>
            </div>
          </div>

          <div className="w-full flex gap-5 justify-around">
            {foreWeatherData.map((item) => (
              <Forecast wData={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
