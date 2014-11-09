'use strict'

CONFIG = require('../config')

nodemailer = require('nodemailer')

smtpTransport = nodemailer.createTransport 'SMTP',
  service: ''
  auth:
    user: ''
    pass: ''

module.exports = smtpTransport
