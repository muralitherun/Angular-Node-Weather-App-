const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const https = require("https");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/weatherReport', (req, res) => {
  const location = req.query.location;
  console.log('Location received:', location);
  const query = location;
  const apiKey = "";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/forecast?q=" + query + "&units=" + unit + "&appid=" + apiKey;

  https.get(url, function(response){
    let responseData = '';

    response.on("data", function(chunk){
      responseData += chunk;
    });

    response.on("end", function(){
      const weatherData = JSON.parse(responseData);

      if (weatherData && weatherData.list) {
        const forecastData = weatherData.list.slice(0, 24).map(item => ({
          time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          temperature: item.main.temp,
          precipitation: item.pop * 100
        }));

        const temp = weatherData.list[0].main.temp;
        const weatherDescription = weatherData.list[0].weather[0].description;
        const icon = weatherData.list[0].weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

        res.json({
          city: location,
          temperature: temp,
          description: weatherDescription,
          icon: icon,
          imageURL: imageURL,
          forecast: forecastData
        });
      } else {
        res.json(null);
      }
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
