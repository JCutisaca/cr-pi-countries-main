const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require('cors')

const corsOptions = {
    origin: 'https://travelsdreamscape.up.railway.app/'
  }

const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors(corsOptions));
 
server.use(router);

module.exports = server;
