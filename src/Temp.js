// https://api.openweathermap.org/data/2.5/weather?q=pune&appid=fe01087be66a02868db936bdc2194dd4

import React, { useEffect, useState } from "react";
import "./styles.css";
import WeatherCard from "./WeatherCard";

const Temp = () => {
  const [searchValue, setSearchValue] = useState("Karkala");
  const [tempInfo, setTempInfo] = useState({});

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=fe01087be66a02868db936bdc2194dd4`;
      let res = await fetch(url);
      let data = await res.json();

      const { temp, pressure, humidity } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };
      setTempInfo(myNewWeatherInfo);
    } catch (error) {
      alert("Please enter proper search field !!");
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);

  const handleForm = (e) => {
    e.preventDefault();
    getWeatherInfo();
  };

  return (
    <>
      <div className="wrap">
        <div className="search">
          <form onSubmit={handleForm}>
            <input
              type="search"
              placeholder="search"
              autoFocus
              id="search"
              className="searchTerm"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button
              className="searchButton"
              type="button"
              onClick={getWeatherInfo}
            >
              Search
            </button>
          </form>
        </div>
      </div>

      <WeatherCard tempInfo={tempInfo} />
    </>
  );
};

export default Temp;
