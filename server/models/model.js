const mongoose = require('mongoose');

const PyramidSchema = new mongoose.Schema({
    word: String,
    pyword: Boolean,
    printout: Array
})
mongoose.model('pyramid', PyramidSchema);