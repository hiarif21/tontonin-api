import mongoose from 'mongoose';

const genreSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const genreModel = mongoose.model('Genre', genreSchema);

export default genreModel;
