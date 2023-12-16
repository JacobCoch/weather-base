import React, { useEffect, useState, useRef } from "react";

import Location from "./location";
import { getWeatherDataByCityName } from "./weatherDataApi";
import "./App.css";

const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

const App = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [cityName, setCityName] = useState("");
    const abortController = useRef(new AbortController());

    const debouncedSearch = debounce(async () => {
        try {
            abortController.current.abort(); // Cancel previous request
            abortController.current = new AbortController();

            if (cityName.trim().length >= 3) {
                const data = await getWeatherDataByCityName(
                    cityName,
                    abortController.current.signal
                );
                if (data) {
                    setWeatherData(data);
                }
            }
        } catch (error) {
            if (error.name !== "AbortError") {
                console.error("Error fetching weather data:", error.message);
            }
        }
    }, 500);

    const handleInputChange = (e) => {
        setCityName(e.target.value);
        debouncedSearch();
    };

    useEffect(() => {
        return () => abortController.current.abort(); // Cleanup on component unmount
    }, []);

    return (
        <div className='App'>
            <header className='App-header'>
                <p>Weather App</p>
                <div>
                    <input
                        type='text'
                        placeholder='Enter City Name'
                        value={cityName}
                        onChange={(e) => {
                            setCityName(e.target.value);
                            debouncedSearch();
                        }}
                    />
                </div>

                {weatherData && (
                    <div>
                        <p>City: {weatherData.name}</p>
                        <p>Temperature: {weatherData.main.temp}</p>
                        {/* Add more fields as needed */}
                    </div>
                )}
            </header>
        </div>
    );
};

export default App;
