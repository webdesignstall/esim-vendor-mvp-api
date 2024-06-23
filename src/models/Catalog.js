const {Schema, model} = require('mongoose');

const catalogSchema = new Schema({
    title: { type: String },
    price: { type: String },
    coverage: { type: String },
    company: { type: String },
    country: { type: String },
    availableNumbers: { type: [String] },

    vendorId: { type: Schema.Types.ObjectId }
}, {timestamps: true, versionKey: false});

const Catalog = model('Catalog', catalogSchema);

module.exports = Catalog;
