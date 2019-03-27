const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors'); 
const hubsRouter = require('./hubs/hubs-router.js');
const { restricted, only, moodyGateKeeper, cohortNamer, bouncer } = require('./middleware/middleware');

const server = express();


// MIDDLEWARE 
server.use(cohortNamer);
server.use(moodyGateKeeper); 
  
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use(cors()); 


// ROUTES ( ROUTES ARE MIDDLEWARE )
server.use('/api/hubs', restricted, only('api-1'), hubsRouter);

server.get('/', (req, res, next) => {
  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome ${req.cohort} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
