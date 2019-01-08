import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './router/index';
// Set up the express app
const app = express();

// Log requests to console
if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup a route that sends back a welcome message in JSON format.
app.get('/api/v1', (req, res) => res.send({
  status: 200,
  message: 'Welcome to the beginning SendIT app',
}));

//
app.get('/', (req, res) => res.sendFile('documentation/doc.html', { root: __dirname }));

routes(app);

export default app;
