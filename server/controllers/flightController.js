const FlightsApi = {
  flightUrl: process.env.REACT_APP_FLIGHT_URL,
  flightKey: process.env.REACT_APP_FLIGHT_KEY,
};

const flightController = {
  fetchFlights: async (req, res, next) => {
    console.log('Reached flightController');
    const query = `${FlightsApi.flightUrl}?access_key=${FlightsApi.flightKey}`;

    try {
      const response = await fetch(query);
      const data = await response.json();
      req.dataVault = data;

      return next();
    } catch (error) {
      console.error('Error fetching flights:', error);
      res.status(500).send('Error fetching flights');
    }
  },
};

module.exports = flightController;
