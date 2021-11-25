import React from 'react'

const Weather = ({ weather, capital }) => {
  if (capital && weather !== {}) {
    return (
      <div>
        <h2>Weather in {capital}</h2>
        <p><b>Temperature: </b>{weather.temperature} °C</p>
        <img src={weather.weather_icons[0]} alt={weather.weather_descriptions[0]} />
        <p><b>Wind: </b>{weather.wind_speed} mph direction {weather.wind_dir}</p>
      </div>
    )
  } else {
    return (
      <p>No weather info for this country</p>
    )
  }
}

export default Weather