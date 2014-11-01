'use strict'

express = require('express')
mongoose = require('mongoose')

bodyParser = require('body-parser')
session = require('express-session')
flash = require('connect-flash')
compression = require('compression')
MongoStore = require('connect-mongo')(session)

router = require('./router')

app = express()

app
  .use('*', router)
  .listen(1337, () ->
    console.log('Express server listening on port ' + 1337)
  )
