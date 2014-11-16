'use strict'

extend = require('extend')
mongoose = require('mongoose')

BookSchema = new mongoose.Schema
  title: type: String, required: true
  authors: type: Array, required: true
  public: type: Boolean, default: false

extend BookSchema.methods,
  isPublic: () ->
    @public

module.exports = mongoose.model('Book', BookSchema)
