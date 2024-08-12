import express from 'express';
import weatherController from './../controllers/weatherController.js';

const weatherRouter = express.Router();

weatherRouter.get(
  '/:iataCode',
  (req, res, next) => {
    console.log('Reached weatherRouter in weatherRouter.js');
    req.dataVault = req.dataVault || {};
    return next();
  },
  weatherController.fetchWeather,
  (req, res) => {
    console.log(req.dataVault);
    const weatherData = req.dataVault;
    return res.status(200).json({ weatherData });
  }
);

export default weatherRouter;
