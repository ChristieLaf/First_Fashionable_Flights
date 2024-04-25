const express = require('express');
const flightController = require('./../controllers/flightController.js')
// Create the router object
const apiRouter = express.Router();

// Define API routes
apiRouter.post('/', 
    (req, res, next) => {
        console.log("Reached apiRouter in apiRouter.js")
        req.dataVault = req.dataVault || {};
        return next();
    },
    flightController.fetchFlights,
    (req, res) => {
        console.log(req.dataVault)
        const flightData = req.dataVault;
        return res.status(200).json({ flightData })
    }
);

module.exports = apiRouter;