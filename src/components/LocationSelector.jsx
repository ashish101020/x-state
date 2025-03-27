import React, { useState, useEffect } from "react";
import { MenuItem, FormControl, Select, Typography, Box } from "@mui/material";

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    fetch("https://crio-location-selector.onrender.com/countries")
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const handleCountryChange = (event) => {
    const country = event.target.value;
    setSelectedCountry(country);
    setSelectedState("");
    setSelectedCity("");
    setStates([]);
    setCities([]);
    fetch(`https://crio-location-selector.onrender.com/country=${country}/states`)
      .then((response) => response.json())
      .then((data) => setStates(data))
      .catch((error) => console.error("Error fetching states:", error));
  };

  const handleStateChange = (event) => {
    const state = event.target.value;
    setSelectedState(state);
    setSelectedCity("");
    setCities([]);
    fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${state}/cities`)
      .then((response) => response.json())
      .then((data) => setCities(data))
      .catch((error) => console.error("Error fetching cities:", error));
  };

  return (
    <div>
      <Box display="flex" gap={2}>
        <FormControl fullWidth>
          <Select value={selectedCountry} onChange={handleCountryChange} displayEmpty>
            <MenuItem value="" disabled>Select Country</MenuItem>
            {countries.map((country) => (
              <MenuItem key={country} value={country}>{country}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth disabled={!selectedCountry}>
          <Select value={selectedState} onChange={handleStateChange} displayEmpty>
            <MenuItem value="" disabled>Select State</MenuItem>
            {states.map((state) => (
              <MenuItem key={state} value={state}>{state}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth disabled={!selectedState}>
          <Select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} displayEmpty>
            <MenuItem value="" disabled>Select City</MenuItem>
            {cities.map((city) => (
              <MenuItem key={city} value={city}>{city}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {selectedCity && (
        <Typography variant="h6" marginTop={2}>
          You selected {selectedCity}, {selectedState}, {selectedCountry}
        </Typography>
      )}
    </div>
  );
};

export default LocationSelector;
