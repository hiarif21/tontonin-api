import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';

import rolesRoutes from './routes/roles.routes.js';
import genresRoutes from './routes/genres.routes.js';
import streamingServicesRoutes from './routes/streamingServices.routes.js';
import personsRoutes from './routes/persons.routes.js';

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Tontonin API');
});

// API
app.use(`/api/roles`, rolesRoutes);
app.use(`/api/genres`, genresRoutes);
app.use(`/api/streaming-services`, streamingServicesRoutes);
app.use(`/api/persons`, personsRoutes);

// ERROR HANDLER
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

export default app;
