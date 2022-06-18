import model from '../models/role.model.js';
import personModel from '../models/person.model.js';

export const create = async (req, res, next) => {
  try {
    const { name } = req.body;

    const result = await model({ name });
    await result.save();

    res.status(201).json({
      success: true,
      message: `successfully created role`,
      data: result,
    });
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
        success: true,
        message: `success getting role`,
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `role not found`,
      });
    }
  } catch (error) {
    console.error(`error while getting role:`, error.message);
    next(error);
  }
};

export const getMultiple = async (req, res, next) => {
  try {
    const result = await model.find({}, 'name');

    if (result) {
      res.status(200).json({
        success: true,
        message: `success getting roles`,
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `roles not found`,
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

    const result = await model.findByIdAndUpdate(
      { _id: id },
      { name },
      { runValidators: true }
    );

    if (result) {
      res.status(201).json({
        success: true,
        message: 'successfully updated role',
      });
    } else {
      res.status(404).json({ success: false, message: 'role not found' });
    }
  } catch (error) {
    console.error(`error while updating role:`, error.message);
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await model.findById(id).countDocuments();

    if (result) {
      const countPersonModel = await personModel
        .find({
          role: id,
        })
        .countDocuments();

      if (!countPersonModel) {
        await model.findByIdAndRemove(id);

        res.status(200).json({
          success: true,
          message: 'successfully deleted role',
        });
      } else {
        res.status(404).json({
          success: false,
          message:
            'Cannot be deleted because this document is related to person',
        });
      }
    } else {
      res.status(404).json({ success: false, message: 'role not found' });
    }
  } catch (error) {
    console.error(`error while deleting role:`, error.message);
    next(error);
  }
};
