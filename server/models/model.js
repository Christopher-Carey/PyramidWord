const mongoose = require('mongoose');

const PyramidSchema = new mongoose.Schema({
    word: String,
    pyword: Boolean
})
mongoose.model('pyramid', PyramidSchema);