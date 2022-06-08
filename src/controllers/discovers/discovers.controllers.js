import model from '../../models/discover.model.js';

export const create = async (req, res, next) => {
  try {
    const { title, movies } = req.body;

    const result = await model({ title, movies });
    await result.save();

    res
      .status(201)
      .json({ message: `successfully created discover`, data: result });
  } catch (error) {
    console.error(`error while creating discover:`, error.message);
    next(error);
  }
};

export const getSingle = async (req, res, next) => {
  try {
    const page = (req.query.page > 0 && req.query.page) || 1;
    const limit = (req.query.limit > 0 && req.query.limit) || 10;

    const { id } = req.params;

    const result = await model
      .findById(id, 'title movies')
      .populate('movies', 'title image')
      .slice('movies', [limit * (page - 1), Number(limit)]);

    const forCountMovies = await model.findById(id, 'movies');

    const total_movies = forCountMovies.movies.length;
    const total_page = Math.ceil(total_movies / limit);

    if (result) {
      res.status(200).json({
        message: `success getting discover`,
        data: {
          page,
          total_page,
          total_movies,
          ...result._doc,
        },
      });
    } else {
      res.status(404).json({
        message: `discover not found`,
        data: {},
      });
    }
  } catch (error) {
    console.error(`error while getting discover:`, error.message);
    next(error);
  }
};

export const getMultiple = async (req, res, next) => {
  try {
    const page = (req.query.page > 0 && req.query.page) || 1;
    const limit = (req.query.limit > 0 && req.query.limit) || 10;

    const limit_movies =
      (req.query.limit_movies > 0 && req.query.limit_movies) || 10;

    const result = await model
      .find({}, 'title movies')
      .populate('movies', 'title image')
      .slice('movies', [0, Number(limit_movies)])
      .skip(limit * (page - 1))
      .limit(limit);

    const total_data = await model.find().count();
    const total_page = Math.ceil(total_data / limit);

    if (result) {
      res.status(200).json({
        message: `success getting discovers`,
        page,
        total_page,
        total_data,
        data: result,
      });
    } else {
      res.status(404).json({
        message: `discovers not found`,
        data: {},
      });
    }
  } catch (error) {
    console.error(`error while getting discovers:`, error.message);
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, movies } = req.body;

    const result = await model.findByIdAndUpdate(
      { _id: id },
      { title, movies },
      { runValidators: true }
    );

    if (result) {
      res.status(201).json({
        message: 'successfully updated discover',
      });
    } else {
      res.status(404).json({ message: 'discover not found' });
    }
  } catch (error) {
    console.error(`error while updating discover:`, error.message);
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await model.findByIdAndRemove(id);

    if (result) {
      res.status(200).json({
        message: 'successfully deleted discover',
      });
    } else {
      res.status(404).json({ message: 'discover not found' });
    }
  } catch (error) {
    console.error(`error while deleting discover:`, error.message);
    next(error);
  }
};
