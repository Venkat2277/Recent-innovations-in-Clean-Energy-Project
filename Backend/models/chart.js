const mongoose = require('mongoose');

const chartSchema = new mongoose.Schema({
    type: {
        type: String, // e.g., 'pie' or 'bar'
        required: true
    },
    label: String,
    labels: [String],
    data: [Number],
    backgroundColor: [String],
    borderColor: String,
    borderWidth: Number
});

module.exports = mongoose.model('Chart', chartSchema);
