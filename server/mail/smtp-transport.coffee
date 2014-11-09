'use strict'

CONFIG = require('../config')
nodemailer = require('nodemailer')

smtpTransport = nodemailer.createTransport 'SMTP',
  service: CONFIG.MAIL_SERVICE
  auth:
    user: CONFIG.MAIL_USER
    pass: CONFIG.MAIL_PASSWORD

module.exports = smtpTransport
