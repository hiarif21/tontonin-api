import model from '../models/watchOption.model.js';

export const create = async (req, res, next) => {
  try {
    const { streaming_service, title, link_streaming } = req.body;

    const result = await model({ streaming_service, title, link_streaming });
    await result.save();

    res.status(201).json({
      success: true,
      message: `successfully created watch option`,
      data: result,
    });
  } catch (error) {
    console.error(`error while creating watch option:`, error.message);
    next(error);
  }
};

export const getSingle = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await model
      .findById(id, 'streaming_service title link_streaming')
      .populate('streaming_service', 'name');

    if (result) {
      res.status(200).json({
        success: true,
        message: `success getting watch option`,
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `watch option not found`,
      });
    }
  } catch (error) {
    console.error(`error while getting watch option:`, error.message);
    next(error);
  }
};

export const getMultiple = async (req, res, next) => {
  try {
    const page = (req.query.page > 0 && req.query.page) || 1;
    const limit = (req.query.limit > 0 && req.query.limit) || 10;

    const title = req.query.title; // string
    const streaming_service = req.query.streaming_service; // objectId

    const filter = {};

    if (title) {
      filter.title = new RegExp(title, 'i');
    }

    if (streaming_service) {
      filter.streaming_service = streaming_service;
    }

    const result = await model
      .find(filter, 'streaming_service title link_streaming')
      .populate('streaming_service', 'name')
      .skip(limit * (page - 1))
      .limit(limit);

    const total_data = await model.find(filter).count();
    const total_page = Math.ceil(total_data / limit);

    if (result) {
      res.status(200).json({
        success: true,
        message: `success getting watch options`,
        page,
        total_page,
        total_data,
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `watch options not found`,
      });
    }
  } catch (error) {
    console.error(`error while getting watch options:`, error.message);
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { streaming_service, title, link_streaming } = req.body;

    const result = await model.findByIdAndUpdate(
      { _id: id },
      { streaming_service, title, link_streaming },
      { runValidators: true }
    );

    if (result) {
      res.status(201).json({
        success: true,
        message: 'successfully updated watch option',
      });
    } else {
      res
        .status(404)
        .json({ success: false, message: 'watch option not found' });
    }
  } catch (error) {
    console.error(`error while updating watch option:`, error.message);
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
          watch_options: id,
        })
        .countDocuments();

      if (!countMovieModel) {
        await model.findByIdAndRemove(id);

        res.status(200).json({
          success: true,
          message: 'successfully deleted watch options',
        });
      } else {
        res.status(404).json({
          success: false,
          message:
            'Cannot be deleted because this document is related to movies',
        });
      }
    } else {
      res
        .status(404)
        .json({ success: false, message: 'watch options not found' });
    }
  } catch (error) {
    console.error(`error while deleting watch options:`, error.message);
    next(error);
  }
};
