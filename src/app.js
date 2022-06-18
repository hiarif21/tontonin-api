import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';

import dashboardRoutes from './routes/dashboard.routes.js';
import rolesRoutes from './routes/roles.routes.js';
import genresRoutes from './routes/genres.routes.js';
import streamingServicesRoutes from './routes/streamingServices.routes.js';
import personsRoutes from './routes/persons.routes.js';
import watchOptionsRoutes from './routes/watchOptions.routes.js';
import moviesRoutes from './routes/movies.routes.js';
import discoversRoutes from './routes/discovers.routes.js';

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API
app.use(`/api/`, dashboardRoutes);
app.use(`/api/roles`, rolesRoutes);
app.use(`/api/genres`, genresRoutes);
app.use(`/api/streaming-services`, streamingServicesRoutes);
app.use(`/api/persons`, personsRoutes);
app.use(`/api/watch-options`, watchOptionsRoutes);
app.use(`/api/movies`, moviesRoutes);
app.use(`/api/discovers`, discoversRoutes);

// ERROR HANDLER
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message,
    success: false,
  });
});

export default app;
