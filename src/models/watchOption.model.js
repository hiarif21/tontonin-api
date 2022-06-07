import mongoose from 'mongoose';

const watchOptionSchema = mongoose.Schema({
  streaming_service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Streaming Service',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  link_streaming: {
    type: String,
    required: true,
  },
});

const watchOptionModel = mongoose.model('Watch Option', watchOptionSchema);

export default watchOptionModel;
