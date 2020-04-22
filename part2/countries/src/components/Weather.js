import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {

    const api = process.env.REACT_APP_API_KEY
    const [weather, setWeather] = useState({})
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api}`
    useEffect(() => {
        axios.get(url)
            .then(response => {
                setWeather({
                    ...weather,
                    de: response.data.weather[0].description.charAt(0).toUpperCase() + response.data.weather[0].description.slice(1),
                    temp: response.data.main.temp
                })
            })
            .catch(e => console.log(e))
    }, [url, weather, api])
    return (
        <div>
            <p>Temperature is: {Math.round(weather.temp - 273.15)} °C </p>
            <p>Description: {weather.de}</p>
        </div>
    )
}
export default Weather

/*
/ <p>{weather.desc.charAt(0).toUpperCase() + weather.desc.slice(1)}</p>
desc: response.data.weather[0].description*/