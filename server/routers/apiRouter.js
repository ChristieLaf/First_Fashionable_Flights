const express = require('express');

// Create the router object
const apiRouter = express.Router();

// Define API routes
apiRouter.post('/', (req, res) => {
    res.json({ message: "Hello from server 3000!" });
});

// Export the router
module.exports = apiRouter;