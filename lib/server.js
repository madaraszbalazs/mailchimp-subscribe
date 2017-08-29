import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import config from './config/config';
import routes from './routes';

const swaggerDocument = require('./swagger/swagger.json');

const app = express();

// MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(config.database);

// Express
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(bodyParser.json());
app.use(cors());

// Morgan
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api', routes);

// Start server
app.listen(3000);
module.exports = app;
