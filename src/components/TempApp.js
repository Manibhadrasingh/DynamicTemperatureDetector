import React, { useEffect, useState } from "react";
import { FaStreetView } from "react-icons/fa";
import "./css/style.css";

const TempApp = () => {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("Pune");

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=1fbca9554b0f8467b1c92f2ae3366ce1`;
        const response = await fetch(url);
        const resJson = await response.json();
        console.log(resJson);
        setCity(resJson.main); 
      } catch (error) {
        console.error("Error fetching data:", error);
        setCity(null); 
      }
    };
    fetchApi();
  }, [search]);

  return (
    <>
      <div className="box">
        <div className="inputData">
          <input
            type="search"
            value={search}
            className="inputField"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>

        {!city ? (
            <p className="errorMsg" style={{ textAlign: 'center', color: 'red' }}>No Data Found</p>
        ) : (
          <div>
            <div className="info">
              <h2 className="location">
                <FaStreetView /> {search}
              </h2>
              <h1 className="temp">{city.temp}° Cel</h1>
              <h3 className="tempmin_max">
                Max :{city.temp_min}° Cel | Max : {city.temp_max}° Cel
              </h3>
            </div>

            <div className="wave -one"></div>
            <div className="wave -two"></div>
            <div className="wave -three"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default TempApp;
