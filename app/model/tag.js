'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const TagSchema = new Schema({
    info: {
      type: Object,
    },
  });

  return mongoose.model('tag', TagSchema);
};