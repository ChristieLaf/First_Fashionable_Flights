const FlightsApi = {
  "flightUrl": 'https://api.aviationstack.com/v1/flights',
  "flightKey": 'c0d0dfa7da4489f4d251c414bd2aef04'
};

const flightController = {
  fetchFlights: async (req, res, next) => {

      // const query = `${FlightsApi.flightUrl}?access_key=${FlightsApi.flightKey}`;

      // try {

      //     const response = await fetch(query);
      //     const data = await response.json();
      //     req.dataVault = data;

      //     next(); 

      // } catch (error) {

      //     console.error('Error fetching flights:', error);
      //     res.status(500).send('Error fetching flights');

      // }
  }
};

module.exports = flightController;