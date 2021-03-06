'use strict'

express = require('express')
passport = require('./passport')
recoveryPasswordMail = require('../../mail/mail-recovery-password')
User = require('../../models/user')

authRouter = express.Router()

authRouter.post '/auth/', (req, res, next) ->
  passport.authenticate('local', (err, user) ->
    req.logIn(user, (err) -> err) if user

    response =
      success: err || user ? !err : false
      user:
        authentication: req.isAuthenticated()
    response.user.admin = true if user && user.isAdmin()
    response.user.publisher = true if user && user.isPublisher()

    res.json(response)
  )(req, res, next)

authRouter.put '/auth/', (req, res, next) ->
  passport.authenticate('local-recovery', (err, user, newPassword) ->
    if !err && user && user.local.email
      mail = recoveryPasswordMail(user.local.email, newPassword)

    response =
      success: !err && !!mail && mail.success
      userExist: !!user

    res.json(response)
  )(req, res, next)

authRouter.get '/auth/', (req, res) ->
  response =
    success: true
    user:
      authentication: req.isAuthenticated()
  response.user.admin = true if req.user && req.user.isAdmin()
  response.user.publisher = true if req.user && req.user.isPublisher()

  res.json(response)

authRouter.delete '/auth/', (req, res) ->
  req.logOut()

  response =
    success: true

  res.json(response)

module.exports = authRouter
