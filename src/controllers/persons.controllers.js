import model from '../models/person.model.js';

export const create = async (req, res, next) => {
  try {
    const { name, role } = req.body;

    const result = await model({ name, role });
    await result.save();

    res
      .status(201)
      .json({ message: `successfully created person`, data: result });
  } catch (error) {
    console.error(`error while creating person:`, error.message);
    next(error);
  }
};

export const getSingle = async (req, res, next) => {
  try {
    const { id } = req.params;

    let result = await model.findById(id, 'name').populate('role', 'name');

    if (result) {
      res.status(200).json({
        message: `success getting person`,
        data: result,
      });
    } else {
      res.status(404).json({
        message: `person not found`,
        data: {},
      });
    }
  } catch (error) {
    console.error(`error while getting person:`, error.message);
    next(error);
  }
};

export const getMultiple = async (req, res, next) => {
  try {
    const page = (req.query.page > 0 && req.query.page) || 1;
    const limit = (req.query.limit > 0 && req.query.limit) || 10;

    const name = req.query.name; // string
    const role = req.query.role; // objectId

    const filter = {};

    if (name) {
      filter.name = new RegExp(name, 'i');
    }

    if (role) {
      filter.role = role;
    }

    const result = await model
      .find(filter, 'name role')
      .populate('role', 'name')
      .skip(limit * (page - 1))
      .limit(limit);

    const total_data = await model.find(filter).count();
    const total_page = Math.ceil(total_data / limit);

    if (result) {
      res.status(200).json({
        message: `success getting persons`,
        page,
        total_page,
        total_data,
        data: result,
      });
    } else {
      res.status(404).json({
        message: `persons not found`,
        data: {},
      });
    }
  } catch (error) {
    console.error(`error while getting persons:`, error.message);
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, role } = req.body;

    const result = await model.findByIdAndUpdate(
      { _id: id },
      { name, role },
      { runValidators: true }
    );

    if (result) {
      res.status(201).json({
        message: 'successfully updated person',
      });
    } else {
      res.status(404).json({ message: 'person not found' });
    }
  } catch (error) {
    console.error(`error while updating person:`, error.message);
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await model.findByIdAndRemove(id);

    if (result) {
      res.status(200).json({
        message: 'successfully deleted person',
      });
    } else {
      res.status(404).json({ message: 'person not found' });
    }
  } catch (error) {
    console.error(`error while deleting person:`, error.message);
    next(error);
  }
};
