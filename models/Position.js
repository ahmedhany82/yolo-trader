const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const positionSchema = new Schema({
  ticker: String,
  averagePrice: Number,
  count: Number
},{
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
  }
  });

const Position = mongoose.model('Position', positionSchema);
module.exports = Position;