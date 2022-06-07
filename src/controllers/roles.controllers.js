import model from '../models/role.model.js';

export const create = async (req, res, next) => {
  try {
    const { name } = req.body;

    const result = await model({ name });
    await result.save();

    res
      .status(201)
      .json({ message: `successfully created role`, data: result });
  } catch (error) {
    console.error(`error while creating role:`, error.message);
    next(error);
  }
};

export const getSingle = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await model.findById(id);

    if (result) {
      res.status(200).json({
        message: `success getting role`,
        data: result,
      });
    } else {
      res.status(404).json({
        message: `role not found`,
        data: {},
      });
    }
  } catch (error) {
    console.error(`error while getting role:`, error.message);
    next(error);
  }
};

export const getMultiple = async (req, res, next) => {
  try {
    const result = await model.find();

    if (result) {
      res.status(200).json({
        message: `success getting roles`,
        data: result,
      });
    } else {
      res.status(404).json({
        message: `roles not found`,
        data: {},
      });
    }
  } catch (error) {
    console.error(`error while getting roles:`, error.message);
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
        message: 'successfully updated role',
        data: result,
      });
    } else {
      res.status(404).json({ message: 'role not found', data: {} });
    }
  } catch (error) {
    console.error(`error while updating role:`, error.message);
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await model.findByIdAndRemove(id);

    if (result) {
      res.status(200).json({
        message: 'successfully deleted role',
        data: result,
      });
    } else {
      res.status(404).json({ message: 'role not found', data: {} });
    }
  } catch (error) {
    console.error(`error while deleting role:`, error.message);
    next(error);
  }
};
