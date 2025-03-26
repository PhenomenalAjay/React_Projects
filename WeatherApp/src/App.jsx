import { useState } from 'react'
import { useEffect } from 'react'

import './App.css'

import SearchIcon from './assets/SearchIcon.png'
import ClearIcon from './assets/ClearIcon.png'
import CloudIcon from './assets/CloudIcon.png'
import DrizzleIcon from './assets/DrizzleIcon.png'
import RainIcon from './assets/RainIcon.png'
import SnowIcon from './assets/SnowIcon.png'
import WindIcon from './assets/WindIcon.png'
import HumidityIcon from './assets/HumidityIcon.png'


const WeatherDetails =({icon,temp,city,country,lat,long,humidity,wind})=>{
 return(
  <>
  <div className='image'>
    <img src={icon} alt="Image" />
  </div>
  <div className='temp'>{temp}°C</div>
  <div className='location'>{city}</div>
  <div className='country'>{country}</div>
  <div className='cord'>
      <div  >
      <span className='lat'>latitude</span>
      <span>{lat}</span>
      </div>
      <div>
      <span className='long'>longitude</span>
      <span>{long}</span>
      </div>
  </div>

  <div className="datacontainer">
  <div className="element">
    <img src={HumidityIcon} alt="" className='icon'/>
    <div className="data">
      <div className="humidity-percent">{humidity}%</div>
      <div className="text">Humidity</div>
    </div>
  </div>
  <div className="element">
    <img src={WindIcon} alt="" className='wind'/>
    <div className="data">
      <div className="wind-percent">{wind} km/h</div>
      <div className="text">Wind Speed</div>
    </div>
  </div>
  
  </div>
  </>
 )
}

function App() {
  let api_key="YOUR_WEATHER_API_KEY_HERE";

  const [text,setText]=useState("Tenkasi")
  const [icon,setIcon]= useState(SnowIcon)
  const [temp, setTemp] = useState(0)
  const [city,setCity]=useState("")
  const [country, setCountry] = useState("India")
  const [lat, setLat] = useState(0)
  const [long, setLong] = useState(0)
  const [humidity, setHumidity] = useState(0)
  const [wind, setWind] = useState(0)
  const[cityNotFound,setCityNotFound]=useState(false);
  const [loading,setLoading]=useState(false);
  const [error, setError] = useState(null);

  const weatherIconMap = {
    "01d": ClearIcon,
    "01n": ClearIcon,
    "02d": CloudIcon,
    "02n": CloudIcon,
    "03d": DrizzleIcon,
    "03n": DrizzleIcon,
    "04d": DrizzleIcon,
    "04n": DrizzleIcon,
    "09d": RainIcon,
    "09n": RainIcon,
    "10d": RainIcon,
    "10n": RainIcon,
    "13d": SnowIcon,
    "13n": SnowIcon,
  }


  const search = async()=>{
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;
    try{
      let res = await fetch(url);
      let data = await res.json();
      if(data.cod === '404'){
        console.error("City Not Found")
        setCityNotFound(true);
        setLoading(false);
        return;
      }

      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country)
      setLat(data.coord.lat)
      setLong(data.coord.lon)
      const weatherIconCode= data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || ClearIcon)
      setCityNotFound(false);
      

    }catch(error){
      console.error("An error occured :",error.message)
      setError("An Error Occured while fetching data")
    }finally{
      setLoading(false)
    }
  }
  const handlecity = (e)=>{
    setText(e.target.value)
  }
  const handledown = (e)=>{
    if(e.key ==="Enter"){
      search();
    }
  } 
  useEffect(function(){
    search();
  },[])

  return (
    <>
      <div className='container'>
        <div className='input-container'>
          <input type ="text" className='cityinput'placeholder='Search City' onChange={handlecity} value={text} onKeyDown={handledown}/>
          
          <div className='search-icon' onClick={()=>search()}>
            <img src={SearchIcon} alt="search" className='search'/>
          </div>

          </div> 

       {!loading && !cityNotFound && <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} long={long} humidity={humidity} wind={wind} />}

        {loading && <div className="loading-message">Loading...</div>}
       { error && <div className="error-message">{error}</div>}
        {cityNotFound && <div className="city-not-found">City Not Found</div>}
        <p className='Name'>
          Project by <i>Ajay Kumar</i>
       </p>
      </div>
    </>
  )
}

export default App
