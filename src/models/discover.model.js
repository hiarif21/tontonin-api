import mongoose from 'mongoose';

const discoverSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    movies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const discoverModel = mongoose.model('Discover', discoverSchema);

export default discoverModel;
