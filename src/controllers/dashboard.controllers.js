import modelDiscovers from '../models/discover.model.js';
import modelMovies from '../models/movie.model.js';
import modelPersons from '../models/person.model.js';
import modelStreaming from '../models/streamingService.model.js';

export const get = async (req, res, next) => {
  try {
    const discovers = await modelDiscovers.find().countDocuments();
    const movies = await modelMovies.find().countDocuments();
    const persons = await modelPersons.find().countDocuments();
    const streaming_services = await modelStreaming.find().countDocuments();

    res.status(200).json({
      success: true,
      message: `success getting genre`,
      data: {
        discovers,
        movies,
        persons,
        streaming_services,
      },
    });
  } catch (error) {
    console.error(`error while getting genre:`, error.message);
    next(error);
  }
};
