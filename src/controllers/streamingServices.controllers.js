import model from '../models/streamingService.model.js';
import watchOptionModel from '../models/watchOption.model.js';

export const create = async (req, res, next) => {
  try {
    const { name } = req.body;

    const result = await model({ name });
    await result.save();

    res.status(201).json({
      success: true,
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

    const result = await model.findById(id, 'name');

    if (result) {
      res.status(200).json({
        success: true,
        message: `success getting streaming service`,
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `streaming service not found`,
      });
    }
  } catch (error) {
    console.error(`error while getting streaming service:`, error.message);
    next(error);
  }
};

export const getMultiple = async (req, res, next) => {
  try {
    const result = await model.find({}, 'name');

    if (result) {
      res.status(200).json({
        success: true,
        message: `success getting streaming services`,
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `streaming services not found`,
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

    const result = await model.findByIdAndUpdate(
      { _id: id },
      { name },
      { runValidators: true }
    );

    if (result) {
      res.status(201).json({
        success: true,
        message: 'successfully updated streaming service',
      });
    } else {
      res
        .status(404)
        .json({ success: false, message: 'streaming service not found' });
    }
  } catch (error) {
    console.error(`error while updating streaming service:`, error.message);
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await model.findById(id).countDocuments();

    if (result) {
      const countWatchOptions = await watchOptionModel
        .find({
          streaming_service: id,
        })
        .countDocuments();

      if (!countWatchOptions) {
        await model.findByIdAndRemove(id);

        res.status(200).json({
          success: true,
          message: 'successfully deleted streaming service',
        });
      } else {
        res.status(404).json({
          success: false,
          message:
            'Cannot be deleted because this document is related to watch options',
        });
      }
    } else {
      res
        .status(404)
        .json({ success: false, message: 'streaming service not found' });
    }
  } catch (error) {
    console.error(`error while deleting streaming service:`, error.message);
    next(error);
  }
};
