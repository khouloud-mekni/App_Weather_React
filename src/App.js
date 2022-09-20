import './App.css'
import Search from './Components/search/Search'
import CurrentWeather from "./Components/CurrentWeather/CurrentWeather";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import { useState } from 'react';
import Forecast from "./Components/Forecast/Forecast";
function App() {
  //create two hooks to store these two
  const [currentWeatherr, setCurrentWeather] = useState(null)
  const [forecast, setForecast] = useState(null)



  const handleOnChangeSearchChange = (searchData) => {
    console.log("searchData", searchData)
    const [lat, lon] = searchData.value.split(" ")
    //create just two fetches and store them into variables and pass that to the array of the promise
    //first one call the current weather fetch and use the fetch methode (we need to pass url )
    console.log("lon", lon.slice(1, lon.length), "lat", lat)
    const CurrentWeatherFetch = fetch(`${WEATHER_API_URL}weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
    const forecastFetch = fetch(`${WEATHER_API_URL}forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)

    Promise.all([CurrentWeatherFetch, forecastFetch])
      .then(async (response) => {
        //we need the methode .json in order to map the response  
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        //1/now we can update once we get the responses and once they are mapped to the json so we will set it

        //2/we want to extend the data that we're sending and saving(weather response and forecast response) because 
        //the data that we're getting from the api doesnot contain the label that we're displaying city and codecountry like the search 
        //so we can just add a city parameter and use the search data 
        setCurrentWeather({ city: searchData.label, ...weatherResponse })
        //use spread operator to create a new object from these two
        setForecast({ city: searchData.label, ...forecastResponse })
      })
      // 4/ we want to at the end if this fails we want to catch and consolelog

      .catch((err) => console.log(err))

  }
  console.log(currentWeatherr)
  console.log(forecast)
  return (
    <div className="container">
      <Search onSearchChange={handleOnChangeSearchChange} />
       {/* we will pass the data to our current weather and then dispaly that instead of my card */}
        {/* we will check if the data exist by adding the initial value of usestate the currentweatherr  */}
      {currentWeatherr && <CurrentWeather data={currentWeatherr}/> }
      {forecast && <Forecast data={forecast}/>}

    </div>
  );
}

export default App;
