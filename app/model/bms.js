'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const BmsSchema = new Schema({
        id: {
            type: String,
        },
        soc: {
            type: String,
        },
        soh: {
            type: String,
        },
    });
    //  name of collection + 's'
    return mongoose.model('b1_data', BmsSchema, 'b1_data');
};