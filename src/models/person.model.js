import mongoose from 'mongoose';

const personSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    required: true,
  },
});

const personModel = mongoose.model('Person', personSchema);

export default personModel;
