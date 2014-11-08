'use strict'

CONFIG = require('./config')

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
  .listen(CONFIG.PORT, () ->
    console.log('Express server listening on port ' + CONFIG.PORT)
  )
