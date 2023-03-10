const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 8000;
const router = require('./routes/router.js')

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

// routes
app.use('/list', router);

// listening for requests
app.listen(PORT, () => {
    console.log('listening on port', PORT)
});