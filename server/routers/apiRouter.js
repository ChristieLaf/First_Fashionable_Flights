const express = require('express');
const flightController = require('./../controllers/flightController.js');
const weatherController = require('./../controllers/weatherController.js');
// Create the router object
const apiRouter = express.Router();

// Define API routes
apiRouter.post(
  '/',
  (req, res, next) => {
    console.log('Reached apiRouter in apiRouter.js');
    req.dataVault = req.dataVault || {};
    return next();
  },
  flightController.fetchFlights,
  (req, res) => {
    console.log(req.dataVault);
    const flightData = req.dataVault;
    return res.status(200).json({ flightData });
  }
);

// apiRouter.get(
//   '/weather/:iataCode',
//   (req, res, next) => {
//     console.log('Reached apiRouter in apiRouter.js');
//     req.dataVault = req.dataVault || {};
//     return next();
//   },
//   weatherController.fetchWeather,
//   (req, res) => {
//     console.log(req.dataVault);
//     const flightData = req.dataVault;
//     return res.status(200).json({ flightData });
//   }
// );

module.exports = apiRouter;
