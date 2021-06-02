const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  status: {
    type: mongoose.Types.Decimal128,
    min: 0,
    max: 100,
    required: true
  },
  is_completed: {
    type: Boolean,
    required: true
  },
  description: {
    type: String
  },
  due_date: {
    type: Date,
    required: true
  },
  published_date: {
    type: Date
  },
  updated_date: {
    type: Date,
    default: Date.now
  }
});

TaskSchema.set('toJSON', {
  getters: true,
  transform: (doc, ret) => {
    ret.status = ret.status.toString();
    delete ret.__v;
    return ret;
  },
});

module.exports = Task = mongoose.model('task', TaskSchema);
