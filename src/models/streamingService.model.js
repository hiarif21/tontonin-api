import mongoose from 'mongoose';

const streamingServiceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const streamingServiceModel = mongoose.model(
  'Streaming Service',
  streamingServiceSchema
);

export default streamingServiceModel;
