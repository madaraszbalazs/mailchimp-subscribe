import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from './config/config';
import routes from './routes';

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

// Routes
app.use('/api', routes);

// Start server
app.listen(3000);
module.exports = app;
