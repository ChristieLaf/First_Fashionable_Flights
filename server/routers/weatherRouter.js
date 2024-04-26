// const express = require('express');
// const weatherController = require('./../controllers/weatherController.js')
// // Create the router object
// const weatherRouter = express.Router();

// // Define API routes
// weatherRouter.post('/', 
//     (req, res, next) => {
//         console.log("Reached apiRouter in apiRouter.js")
//         req.dataVault = req.dataVault || {};
//         return next();
//     },
//     weatherController.fetchWeather,
//     (req, res) => {
//         console.log(req.dataVault)
//         const weatherData = req.dataVault;
//         return res.status(200).json({ weatherData })
//     }, 
// );

// module.exports = weatherRouter;
