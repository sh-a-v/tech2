'use strict'

CONFIG = require('./config')

express = require('express')
mongoose = require('mongoose')
subdomain = require('express-subdomain')

bodyParser = require('body-parser')
session = require('express-session')
flash = require('connect-flash')
compression = require('compression')
MongoStore = require('connect-mongo')(session)

clientRouter = require('./router/client-router')
managerRouter = require('./router/manager-router')
apiRouter = require('./router/api-router')

app = express()

app.use subdomain('api', apiRouter)
app.use subdomain('manager', managerRouter)
app.use '*', clientRouter

app.listen CONFIG.PORT, () ->
    console.log "Express server listening on port #{CONFIG.PORT}"
