const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

const apiRouter = require('./routers/apiRouter.js');

app.use('/api', apiRouter);

app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

app.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
