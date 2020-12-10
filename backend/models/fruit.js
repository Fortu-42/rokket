const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const fruitSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: false
  },
},{
    timestamps: true
  });

module.exports = mongoose.model("Fruit", fruitSchema);
