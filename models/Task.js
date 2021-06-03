const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  dueDate: {
    type: Date,
    required: true
  },
  status: {
    type: mongoose.Types.Decimal128,
    min: 0,
    max: 100,
    required: true,
    default: 0,
  },
  isCompleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

TaskSchema.set('toJSON', {
  getters: true,
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    ret.status = parseInt(ret.status.toString());
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = Task = mongoose.model('task', TaskSchema);
