import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ capital }) => {
    const api = process.env.REACT_APP_API_KEY;
    const [weather, setWeather] = useState({});
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api}`;
    useEffect(() => {
        axios.get(url)
            .then(response => 
                setWeather({
                    ...weather,
                    description: response.data.weather[0].description.charAt(0).toUpperCase() + response.data.weather[0].description.slice(1),
                    temperature: response.data.main.temp
                })
            )
            .catch(e => console.log(e))
    }, [url])
    return (
        <div>
            <h1>Weather in {capital}</h1>
            <p>Temperature is: {Math.round(weather.temperature - 273.15)} °C </p>
            <p>Description: {weather.description}</p>
        </div>
    )
}
export default Weather;
