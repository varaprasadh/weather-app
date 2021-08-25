const express = require('express');
const cors = require('cors');
const {default: axios } = require('axios');

const app = express();


const WEATHER_API_KEY = "1635890035cbba097fd5c26c8ea672a1";

app.use(cors());





app.get('/weather/:city', async (req, res)=>{

    const {city} = req.params;
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${WEATHER_API_KEY}`;
    console.log({url});
   
    try{
        const response = await axios.get(url).then(response => response.data);
        // make api call
        const  { list = []} = response;


        const dailyData = response.list.reduce((data, forecast) => {
            const timestampUTC = parseInt(forecast.dt) * 1000;
            const date = (new Date(timestampUTC)).toLocaleDateString();

            if (!data[date]) {
                const { main: info } = forecast;
                const {
                    temp_min,
                    temp_max,
                    pressure,
                    humidity
                } = info;

                const formattedForecast = {
                    date: date,
                    temp_min,
                    temp_max,
                    pressure,
                    humidity
                }
                data[date] = formattedForecast
            }

            return data;

        }, {});


            
       return res.status(200).json({
           status: "success",
           data: Object.values(dailyData)
       });


    }catch(err){
        console.log(err);
        return res.status(404).json({
            status:"failed",
            error:"something went wrong"
        })
    }
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=>{
    console.log(`sever running at PORT:${PORT}`);
})
