const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '', trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Item', itemSchema);



