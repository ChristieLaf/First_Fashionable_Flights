const https = require('https');

const weatherApi = {
  "weatherUrl": 'https://api.openweathermap.org/data/2.5/weather',
  "weatherKey": '094780c710fa4efd669f0df8c3991927'
};

const weatherController = {
  fetchWeather: async (req, res) => {
    const departureCity = req.body.departureCity;
    const arrivalCity = req.body.arrivalCity;

    const urls = [
      `${weatherApi.weatherUrl}?q=${departureCity}&appid=${weatherApi.weatherKey}&units=metric`,
      `${weatherApi.weatherUrl}?q=${arrivalCity}&appid=${weatherApi.weatherKey}&units=metric`
    ];

    Promise.all(urls.map(url => new Promise((resolve, reject) => {
      https.get(url, response => {
        let data = '';
        response.on('data', chunk => data += chunk);
        response.on('end', () => resolve(JSON.parse(data)));
      }).on('error', reject);
    })))
    .then(results => {
      res.json({
        departureWeather: results[0],
        arrivalWeather: results[1]
      });
    })
    .catch(error => {
      console.error('Error fetching weather:', error);
      res.status(500).send('Error fetching weather');
    });
  }
};

module.exports = weatherController;
  