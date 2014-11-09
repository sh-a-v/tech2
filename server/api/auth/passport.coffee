'use strict'

express = require('express')
passport = require('passport')
generatePassword = require('password-generator')

LocalStrategy = require('passport-local').Strategy
User = require('../../models/user')

passport.use 'local', new LocalStrategy
  usernameField: 'email'
  passwordField: 'password'
  passReqToCallback: true,

  (req, email, password, done) ->
    User.findOne 'local.email': email, (err, user) ->
      return done(err) if err

      if user
        if !user.validPassword(password) then done(err) else done(null, user)
      else
        newUser = new User

        newUser.local.email = email
        newUser.local.password = newUser.generateHash(password)

        newUser.save (err) ->
          if err then done(err) else done(err, newUser)

passport.use 'local-recovery', new LocalStrategy
  usernameField: 'email'
  passwordField: 'recovery'
  passReqToCallback: true,

  (req, email, password, done) ->
    User.findOne 'local.email': email, (err, user) ->
      return done(err) if err

      if user
        newPassword = generatePassword(12, false)

        user.local.password = user.generateHash(newPassword)

        user.save (err) ->
          if err then done(err) else done(err, user, newPassword)
      else
        done(err)

passport.serializeUser (user, done) ->
  done(null, user.id)

passport.deserializeUser (id, done) ->
  User.findById id, (err, user) ->
    done(err, user)

module.exports = passport
