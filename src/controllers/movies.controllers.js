import model from '../models/movie.model.js';

export const create = async (req, res, next) => {
  try {
    const {
      title,
      image,
      release_year,
      runtime,
      storyline,
      link_trailer,
      watch_options,
      persons,
      genres,
    } = req.body;

    const result = await model({
      title,
      image,
      release_year,
      runtime,
      storyline,
      link_trailer,
      watch_options,
      persons,
      genres,
      views: 0,
    });
    await result.save();

    res
      .status(201)
      .json({ message: `successfully created movie`, data: result });
  } catch (error) {
    console.error(`error while creating movie:`, error.message);
    next(error);
  }
};

export const getSingle = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await model
      .findById(
        id,
        'title image release_year runtime storyline link_trailer watch_options persons genres'
      )
      .populate('watch_options', 'title link_streaming')
      .populate('persons genres', 'name');

    if (result) {
      await model.findByIdAndUpdate(id, { $inc: { views: 1 } });

      res.status(200).json({
        message: `success getting movie`,
        data: result,
      });
    } else {
      res.status(404).json({
        message: `movie not found`,
        data: {},
      });
    }
  } catch (error) {
    console.error(`error while getting movie:`, error.message);
    next(error);
  }
};

export const getMultiple = async (req, res, next) => {
  try {
    const page = (req.query.page > 0 && req.query.page) || 1;
    const limit = (req.query.limit > 0 && req.query.limit) || 10;

    const title = req.query.title; // string

    const watch_options = req.query.watch_options; // objectId
    const persons = req.query.persons; // objectId
    const genres = req.query.genres; // objectId

    const filter = {};

    if (title) {
      filter.title = new RegExp(title, 'i');
    }

    if (watch_options) {
      filter.watch_options = watch_options;
    }

    if (persons) {
      filter.persons = persons;
    }

    if (genres) {
      filter.genres = genres;
    }

    const result = await model
      .find(
        filter,
        'title image release_year runtime storyline link_trailer watch_options persons genres'
      )
      .populate('watch_options', 'title link_streaming')
      .populate('persons genres', 'name')
      .skip(limit * (page - 1))
      .limit(limit);

    const total_data = await model.find(filter).count();
    const total_page = Math.ceil(total_data / limit);

    if (result) {
      res.status(200).json({
        message: `success getting movies`,
        page,
        total_page,
        total_data,
        data: result,
      });
    } else {
      res.status(404).json({
        message: `movies not found`,
        data: {},
      });
    }
  } catch (error) {
    console.error(`error while getting movies:`, error.message);
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      image,
      release_year,
      runtime,
      storyline,
      link_trailer,
      watch_options,
      persons,
      genres,
    } = req.body;

    const result = await model.findByIdAndUpdate(
      { _id: id },
      {
        title,
        image,
        release_year,
        runtime,
        storyline,
        link_trailer,
        watch_options,
        persons,
        genres,
      },
      { runValidators: true }
    );

    if (result) {
      res.status(201).json({
        message: 'successfully updated movie',
      });
    } else {
      res.status(404).json({ message: 'movie not found' });
    }
  } catch (error) {
    console.error(`error while updating movie:`, error.message);
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await model.findByIdAndRemove(id);

    if (result) {
      res.status(200).json({
        message: 'successfully deleted movie',
      });
    } else {
      res.status(404).json({ message: 'movie not found' });
    }
  } catch (error) {
    console.error(`error while deleting movie:`, error.message);
    next(error);
  }
};
