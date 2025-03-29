
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DropDownComponent.css";

const DropDownComponent = () => {
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  var getCountryData = async () => {
    let countriesEndPoint =
      "https://crio-location-selector.onrender.com/countries";
    try {
      let response = await axios.get(countriesEndPoint);
      setCountryData(response.data);
    } catch (error) {
      console.log("Error while fetching the Countries", error);
    }
  };
  var getStateData = async () => {
    if (selectedCountry) {
      let statesEndpoint = `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`;
      try {
        let response = await axios.get(statesEndpoint);
        setStateData(response.data);
      } catch (error) {
        console.log("Error while Fetching the States: ", error);
      }
    }
  };
  var getCityData = async () => {
    if (selectedCountry && selectedState) {
      let citiesEndpoint = `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`;
      try {
        let response = await axios.get(citiesEndpoint);
        console.log(response.data);
        setCityData(response.data);
      } catch (error) {
        console.log("Error while Fetching the Cities: ", error);
      }
    }
  };

  useEffect(() => {
    getCountryData();
  }, []);

  useEffect(() => {
    getStateData();
  }, [selectedCountry]);

  useEffect(() => {
    getCityData();
  }, [selectedState]);

  return (
    <>
      <h1>Select Location</h1>
      <div>
        <select
          className="dropdown"
          name="selectCountry"
          id="selectCountry"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option value="" disabled>
            Select Country
          </option>
          {countryData.map((ele) => (
            <option key={ele} id={ele} value={ele}>
              {ele}
            </option>
          ))}
        </select>
        <select
          className="dropdown"
          name="selectState"
          id="selectState"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
        >
          <option value="" disabled>
            Select State
          </option>
          {stateData.map((ele) => (
            <option key={ele} id={ele} value={ele}>
              {ele}
            </option>
          ))}
        </select>
        <select
          className="dropdown"
          name="selectCity"
          id="selectCity"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option value="" disabled>
            Select City
          </option>
          {cityData.map((ele) => (
            <option key={ele} id={ele} value={ele}>
              {ele}
            </option>
          ))}
        </select>
      </div>
      {selectedCountry && selectedState && selectedCity && (
        <h2>
          You selected <span className="highlight">{selectedCity}</span>,{" "}
          <span className="fade">
            {selectedState}, {selectedCountry}
          </span>
        </h2>
      )}
    </>
  );
};

export default DropDownComponent;