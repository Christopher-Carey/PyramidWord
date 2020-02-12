require('../models/model')

const mongoose = require('mongoose'),
    pyramid = mongoose.model("pyramid");

    module.exports = {

        index: function (request, response) {
            pyramid.find()
                .then(pyramids => response.json({ results: pyramids }))
                .catch(err => response.json({ error: err.error }))
        },
        show: function (request, response) {
            pyramid.findOne({ _id: request.params.id })
                .then(pyramid => response.json({ results: pyramid }))
                .catch(err => response.json({ error: err.error }))
        },
        create: function (request, response) {
            pyramid.create(request.body)
                .then(pyramid => response.json({ results: pyramid }))
                .catch(err => response.json({ error: err.error }))
        },
        destroy: function (request, response) {
            pyramid.remove({ _id: request.params.id })
                .then(pyramid => response.json({ results: pyramid }))
                .catch(err => response.json({ error: err.error }))
        },
        update: function (request, response) {
            console.log(request.body)
            pyramid.updateOne({_id:request.params.id}, request.body)
                .then(result =>  response.json({ results: result }))
                .catch(err => response.json({ error: err.error }))
        }
    };