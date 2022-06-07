import model from '../models/streamingService.model.js';

export const create = async (req, res, next) => {
  try {
    const { name } = req.body;

    const result = await model({ name });
    await result.save();

    res
      .status(201)
      .json({
        message: `successfully created streaming service`,
        data: result,
      });
  } catch (error) {
    console.error(`error while creating streaming service:`, error.message);
    next(error);
  }
};

export const getSingle = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await model.findById(id);

    if (result) {
      res.status(200).json({
        message: `success getting streaming service`,
        data: result,
      });
    } else {
      res.status(404).json({
        message: `streaming service not found`,
        data: {},
      });
    }
  } catch (error) {
    console.error(`error while getting streaming service:`, error.message);
    next(error);
  }
};

export const getMultiple = async (req, res, next) => {
  try {
    const result = await model.find();

    if (result) {
      res.status(200).json({
        message: `success getting streaming services`,
        data: result,
      });
    } else {
      res.status(404).json({
        message: `streaming services not found`,
        data: {},
      });
    }
  } catch (error) {
    console.error(`error while getting streaming services:`, error.message);
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const result = await model.findByIdAndUpdate({ _id: id }, { name });

    if (result) {
      res.status(201).json({
        message: 'successfully updated streaming service',
        data: result,
      });
    } else {
      res
        .status(404)
        .json({ message: 'streaming service not found', data: {} });
    }
  } catch (error) {
    console.error(`error while updating streaming service:`, error.message);
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await model.findByIdAndRemove(id);

    if (result) {
      res.status(200).json({
        message: 'successfully deleted streaming service',
        data: result,
      });
    } else {
      res
        .status(404)
        .json({ message: 'streaming service not found', data: {} });
    }
  } catch (error) {
    console.error(`error while deleting streaming service:`, error.message);
    next(error);
  }
};
