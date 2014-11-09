'use strict'

mongoose = require('mongoose')
bcrypt = require('bcrypt-nodejs')
extend = require('extend')

UserSchema = new mongoose.Schema
  local:
    email: type: String, required: true, unique: true
    password: type: String, required: true

  publisher: type: Boolean, default: false
  admin: type: Boolean, default: false


extend UserSchema.methods,
  generateHash: (password) ->
    bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)

  validPassword: (password) ->
    bcrypt.compareSync(password, @local.password)

  isAdmin: () ->
    @admin

  isPublisher: () ->
    @publisher

module.exports = mongoose.model('User', UserSchema)
