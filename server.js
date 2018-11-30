const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

var carCRUD = require('./routers/carCRUD');
const socketIo = require("socket.io");

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

// Load environment file
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

// Route config
app.use('/api/v1', carCRUD);

app.get('/', (req, res) => {
    res.send({ngon: 'hihi'})
})

// Run server
const http = require("http");

const server = http.createServer(app);
global.io = socketIo(server);
io.on('connection', function(socket) {
    console.log("Connected client: " + io.engine.clientsCount);
    socket.on('disconnect', function() {
      console.log("Connected client: " + io.engine.clientsCount);
    });
});

server.listen(process.env.PORT | 8081);
console.log("Api server running on: ", process.env.PORT);