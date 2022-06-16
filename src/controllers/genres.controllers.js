import model from '../models/genre.model.js';

export const create = async (req, res, next) => {
  try {
    const { name } = req.body;

    const result = await model({ name });
    await result.save();

    res
      .status(201)
      .json({ message: `successfully created genre`, data: result });
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
        message: `success getting genre`,
        data: result,
      });
    } else {
      res.status(404).json({
        message: `genre not found`,
        data: {},
      });
    }
  } catch (error) {
    console.error(`error while getting genre:`, error.message);
    next(error);
  }
};

export const getMultiple = async (req, res, next) => {
  try {
    const result = await model.find({}, 'name');

    if (result) {
      res.status(200).json({
        message: `success getting genres`,
        data: result,
      });
    } else {
      res.status(404).json({
        message: `genres not found`,
        data: {},
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
        message: 'successfully updated genre',
      });
    } else {
      res.status(404).json({ message: 'genre not found' });
    }
  } catch (error) {
    console.error(`error while updating genre:`, error.message);
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await model.findByIdAndRemove(id);

    if (result) {
      res.status(200).json({
        message: 'successfully deleted genre',
      });
    } else {
      res.status(404).json({ message: 'genre not found' });
    }
  } catch (error) {
    console.error(`error while deleting genre:`, error.message);
    next(error);
  }
};
