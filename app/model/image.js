'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ImageSchema = new Schema({
    id: {
      type: Number,
    },
    info: {
      type: Object,
    },
    path: {
      type: String,
      unique: true,
      dropDups: true,
    },
  });

  return mongoose.model('images', ImageSchema);
};