import mongoose from 'mongoose';

const roleSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const roleModel = mongoose.model('Role', roleSchema);

export default roleModel;
