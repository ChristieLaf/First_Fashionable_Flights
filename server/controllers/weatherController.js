const https = require('https');
require('dotenv').config();

const weatherApi = {
  weatherUrl: process.env.REACT_APP_WEATHER_URL,
  weatherKey: process.env.REACT_APP_WEATHER_KEY,
};

const getCoordinatesFromIATA = (iataCode) => {
  const iataToCoordinates = {
    PPP: { lat: -20.495, lon: 148.552 },
    // Add more mappings as needed
  };
  return iataToCoordinates[iataCode];
};

const weatherController = {
  fetchWeather: async (req, res) => {
    const { iataCode } = req.params;
    const coordinates = getCoordinatesFromIATA(iataCode);

    if (!coordinates) {
      return res.status(404).json({ error: 'Invalid IATA code' });
    }

    const url = `${weatherApi.weatherUrl}?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${weatherApi.weatherKey}&units=metric`;

    https
      .get(url, (response) => {
        let data = '';
        response.on('data', (chunk) => (data += chunk));
        response.on('end', () => res.json(JSON.parse(data)));
      })
      .on('error', (error) => {
        console.error('Error fetching weather:', error);
        res.status(500).send('Error fetching weather');
      });
  },
};

module.exports = weatherController;
