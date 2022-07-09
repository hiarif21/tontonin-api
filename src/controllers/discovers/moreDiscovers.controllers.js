import model from '../../models/movie.model.js';

export const mostPopular = async (req, res, next) => {
  try {
    const page = (req.query.page > 0 && req.query.page) || 1;
    const limit = (req.query.limit > 0 && req.query.limit) || 10;

    const result = await model
      .find({}, 'title image')
      .sort({ views: -1, _id: -1 })
      .skip(limit * (page - 1))
      .limit(limit);

    const total_data = await model.find().countDocuments();
    const total_page = Math.ceil(total_data / limit);

    if (result) {
      res.status(200).json({
        success: true,
        message: `success getting most popular`,
        page,
        total_page,
        total_data,
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `most popular not found`,
      });
    }
  } catch (error) {
    console.error(`error while getting most popular:`, error.message);
    next(error);
  }
};

export const newRelease = async (req, res, next) => {
  try {
    const page = (req.query.page > 0 && req.query.page) || 1;
    const limit = (req.query.limit > 0 && req.query.limit) || 10;

    const result = await model
      .find({}, 'title image')
      .sort({ release_year: -1, _id: -1 })
      .skip(limit * (page - 1))
      .limit(limit);

    const total_data = await model.find().countDocuments();
    const total_page = Math.ceil(total_data / limit);

    if (result) {
      res.status(200).json({
        success: true,
        message: `success getting new release`,
        page,
        total_page,
        total_data,
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `new release not found`,
      });
    }
  } catch (error) {
    console.error(`error while getting new release:`, error.message);
    next(error);
  }
};
