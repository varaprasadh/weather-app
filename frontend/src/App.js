
import { useState } from 'react';
import './App.css';
import Loader from './components/Loader';


function ForecastCard({forecast }){
   return (
     <div className="card-wrapper">
       <div className="date">{forecast.date}</div>
       <div className="temp-header">Temperature</div>
       <div className="flex-container">
         <div className="inner-flex section-temperature">
           <div className="inner-flex-item">Min</div>
           <div className="inner-flex-item">Max</div>
         </div>
         <div className="inner-flex section-temperature">
           <div className="inner-flex-item">{forecast.temp_min}</div>
           <div className="inner-flex-item">{forecast.temp_max}</div>
         </div>
         <div className="inner-flex">
           <div className=" inner-flex-item">Pressure</div>
           <div className=" inner-flex-item">{forecast.pressure}</div>
         </div>
         <div className="inner-flex">
           <div className="inner-flex-item">Humidity</div>
           <div className="inner-flex-item">{forecast.humidity}</div>
         </div>
       </div>
     </div>
   )
}




function App() {
  
  const [city, setCity] = useState("");
  const [forecasts, setForecasts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getWeatherData = async (city) => {
      setLoading(true);
      fetch(`http://localhost:3001/weather/${city}`)
      .then(res=>res.json())
      .then(json=>{
          const { data } = json;
          setForecasts(data);
      }).catch(error =>{
        console.log(error);
        alert("something went wrong");
      }).finally(()=>{
        setLoading(false);
      })
    }

  return (
    <div className="App">
        <div className="header">
             <div className="title">Weather In Your City</div>
             <div className="search-bar">
                <div className="input-wrapper">
                  <input 
                    type="text" 
                    value={city}
                    placeholder="search here..."
                    onChange={({ target: {value:city} })=>setCity(city)}
                    onKeyUp={( { key }) => key === 'Enter' && getWeatherData(city)}
                    />
                </div>
                <div className="search-button-wrapper">
                  <button onClick={() => getWeatherData(city)}>Search</button>
                </div>
                {
                  loading && <Loader/>
                }
             </div>

        </div>
        <div className="forecasts-wrapper">
          {
            (forecasts || []).map((forecast, index)=>{
              return <ForecastCard forecast={forecast} key={index}/>
            })
          }
        </div>
    </div>
  );
}

export default App;

//visakhapatnam
