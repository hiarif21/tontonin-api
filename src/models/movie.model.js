import mongoose from 'mongoose';

const movieSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  release_year: {
    type: Number,
    required: true,
  },
  runtime: {
    type: Number,
    required: true,
  },
  storyline: {
    type: String,
    required: true,
  },
  link_trailer: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    required: true,
  },
  watch_options: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Watch Option',
      required: true,
    },
  ],
  persons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Person',
      required: true,
    },
  ],
  genres: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Genre',
      required: true,
    },
  ],
});

const movieModel = mongoose.model('Movie', movieSchema);

export default movieModel;
