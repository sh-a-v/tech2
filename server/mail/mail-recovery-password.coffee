'use strict'

nodemailer = require('nodemailer')
smtpTransport = require('./smtp-transport')

module.exports = (email, password) ->
  mailOptions =
    from: "Tech"
    to: email
    subject: "Восстановление пароля"
    html: "Ваш новый пароль: #{password}"

  smtpTransport.sendEmail mailOptions, (err, res) ->
    return success: Boolean(err) res: res err: err
