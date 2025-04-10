import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
const api_key = import.meta.env.VITE_API_KEY;
function App() {
  const [countries, setCountries] = useState([])
  const [copyCountries, setCopyCountries] = useState([])
  const [showDetail, setShowDetail] = useState(false)
  const [countryDetail, setCountryDetail] = useState(null)
  const [countryWeather, setCountryWeather] = useState(null)
  useEffect(() => {
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response => {
        setCopyCountries(response.data)
        setCountries(response.data)
      })
      .catch(err => console.log(err))
  }, [])

  const handleSearching = (e) => {
    if (showDetail) {
      setShowDetail(false)
    }
    const foundCountries = countries.filter(country => {
      return country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setCopyCountries(foundCountries)
  }


  const handleShowDetail = (country) => {
    axios.post(`https://api.openweathermap.org/data/2.5/weather?q=${country.name.common}&appid=${api_key}&units=metric`)
      .then(response => {
        console.log(response)
        setCountryWeather(response.data)
      })
    setCountryDetail(country)
    setShowDetail(true)
  }
  console.log(countryDetail)
  return (
    <div>
      <div>Find countries <input onChange={(e) => handleSearching(e)} /></div>
      {copyCountries.length > 10 ?
        <div>Too many mathches, specify another filter</div>
        :
        <div>{copyCountries?.map((country) => {
          return (
            <div>{country.name.common}<button onClick={() => handleShowDetail(country)}>Show</button></div>
          )
        })}</div>
      }
      {showDetail && countryDetail &&
        <div>
          <h1>{countryDetail.name.common}</h1>
          <div>Capital: {countryDetail.capital.join(", ")}</div>
          <div>Area: {countryDetail.area}</div>
          <h2>Languages</h2>
          {Object.values(countryDetail.languages).map(value => {
            return (
              <li>{value}</li>
            )
          })}
          <img src={countryDetail.flags.png} />
          <h1>Weather in {countryDetail.name.common}</h1>
          <div>Temperature: {countryWeather?.main.temp} Celsius</div>
          <img src={`https://openweathermap.org/img/wn/${countryWeather?.weather[0].icon}@2x.png`} />
          <div>Wind: {countryWeather?.wind.speed} m/s</div>
        </div>}
    </div>
  )
}

export default App
