import React, { useState } from "react";

import Location from "./location";
import { getWeatherDataByCityName } from "./weatherDataApi";
import "./App.css";

const App = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [cityName, setCityName] = useState("");

    const handleSearch = async () => {
        try {
            const data = await getWeatherDataByCityName(cityName);
            console.log(data);
            setWeatherData(data);
        } catch (error) {
            console.error(error);
        }
    };

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleTimeString();
    };

    const getWeatherIconUrl = (icon) => {
        return `http://openweathermap.org/img/wn/${icon}@2x.png`;
    };

    return (
        <div className='App'>
            <div className='main-container'>
                <header className='App-header'>
                    <p>Weather Base</p>
                </header>
                <div id='cover'>
                    <div className='tb'>
                        <div className='td'>
                            <input
                                id='searchInput'
                                type='text'
                                placeholder='Enter City Name'
                                value={cityName}
                                onChange={(e) => setCityName(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSearch();
                                    }
                                }}
                            />
                        </div>
                        <div className='td' id='s-cover'>
                            <button
                                type='button'
                                className='Icon'
                                onClick={handleSearch}
                            >
                                <div id='s-circle' />
                                <span />
                            </button>
                        </div>
                    </div>
                </div>

                <div>
                    <div className='location-image-card'>
                        <div className='location-card'>
                            <p>
                                City:{" "}
                                {weatherData
                                    ? weatherData.name
                                    : "No city selected"}
                            </p>
                            <p>
                                Country:{" "}
                                {weatherData ? weatherData.sys.country : "--"}
                            </p>
                        </div>
                        <p className='weather-icon'>
                            {weatherData ? (
                                <img
                                    src={getWeatherIconUrl(
                                        weatherData.weather[0].icon
                                    )}
                                    alt='Weather Icon'
                                />
                            ) : (
                                "--"
                            )}
                        </p>
                    </div>
                    <div>
                        <p>
                            Main:{" "}
                            {weatherData ? weatherData.weather[0].main : "--"}
                        </p>
                        <p>
                            Description:{" "}
                            {weatherData
                                ? weatherData.weather[0].description
                                : "--"}
                        </p>
                        <p>
                            Temperature:{" "}
                            {weatherData ? weatherData.main.temp : "--"}
                        </p>
                        <p>
                            Feels Like:{" "}
                            {weatherData ? weatherData.main.feels_like : "--"}
                        </p>
                        <p>
                            Humidity:{" "}
                            {weatherData ? weatherData.main.humidity : "--"}
                        </p>
                        <p>
                            Wind Speed:{" "}
                            {weatherData ? weatherData.wind.speed : "--"}
                        </p>
                        <p />
                    </div>
                    <div>
                        <p>
                            Sunrise:{" "}
                            {weatherData
                                ? formatTimestamp(weatherData.sys.sunrise)
                                : "N/A"}
                        </p>
                        <p>
                            Sunset:{" "}
                            {weatherData
                                ? formatTimestamp(weatherData.sys.sunset)
                                : "N/A"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
