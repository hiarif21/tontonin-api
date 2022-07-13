import model from '../models/genre.model.js';
import movieModel from '../models/movie.model.js';

export const create = async (req, res, next) => {
  try {
    const { name } = req.body;

    const result = await model({ name });
    await result.save();

    res.status(201).json({
      success: true,
      message: `successfully created genre`,
      data: result,
    });
  } catch (error) {
    console.error(`error while creating genre:`, error.message);
    next(error);
  }
};

export const getSingle = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await model.findById(id);

    if (result) {
      res.status(200).json({
        success: true,
        message: `success getting genre`,
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `genre not found`,
      });
    }
  } catch (error) {
    console.error(`error while getting genre:`, error.message);
    next(error);
  }
};

export const getMultiple = async (req, res, next) => {
  try {
    const result = await model.find({}, 'name').sort({ name: 1 });

    if (result) {
      res.status(200).json({
        success: true,
        message: `success getting genres`,
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `genres not found`,
      });
    }
  } catch (error) {
    console.error(`error while getting genres:`, error.message);
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const result = await model.findByIdAndUpdate(
      { _id: id },
      { name },
      { runValidators: true }
    );

    if (result) {
      res.status(201).json({
        success: true,
        message: 'successfully updated genre',
      });
    } else {
      res.status(404).json({ success: false, message: 'genre not found' });
    }
  } catch (error) {
    console.error(`error while updating genre:`, error.message);
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await model.findById(id).countDocuments();

    if (result) {
      const countMovieModel = await movieModel
        .find({
          genres: id,
        })
        .countDocuments();

      if (!countMovieModel) {
        await model.findByIdAndRemove(id);

        res.status(200).json({
          success: true,
          message: 'successfully deleted genre',
        });
      } else {
        res.status(404).json({
          success: false,
          message:
            'Cannot be deleted because this document is related to movies',
        });
      }
    } else {
      res.status(404).json({ success: false, message: 'genre not found' });
    }
  } catch (error) {
    console.error(`error while deleting genre:`, error.message);
    next(error);
  }
};
