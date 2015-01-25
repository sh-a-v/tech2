'use strict'

CONFIG = require './config'

express = require 'express'
cors = require 'cors'
mongoose = require 'mongoose'

subdomain = require 'express-subdomain'
bodyParser = require 'body-parser'
session = require 'express-session'
flash = require 'connect-flash'
compression = require 'compression'
passport = require './api/auth/passport'
connectMongo = require 'connect-mongo'

path = require 'path'

clientRouter = require './router/client-router'
managerRouter = require './router/manager-router'
apiRouter = require './router/api-router'

app = express()

MongoStore = connectMongo(session)
mongoose.connect(CONFIG.DATABASE_URL)

app.use cors()
app.use compression()
app.use bodyParser.json()
app.use bodyParser.urlencoded
  extended: true
app.use session
  secret: CONFIG.SECRET
  cookie:
    maxAge: 31536000000
  store: new MongoStore
    url: CONFIG.DATABASE_URL
  resave: true
  saveUninitialized: true
app.use passport.initialize()
app.use passport.session()
app.use flash()

app.use '/static/client', express.static(path.join __dirname, '..', CONFIG.CLIENT.STATIC_FILES_PATH)
app.use '/static/manager', express.static(path.join __dirname, '..', CONFIG.MANAGER.STATIC_FILES_PATH)

#app.use subdomain('api', apiRouter)
#app.use subdomain('manager', managerRouter)
app.use '/api', apiRouter
app.use '/manager', managerRouter
app.use '*', clientRouter

app.listen CONFIG.PORT, () ->
  console.log "Express server listening on port #{CONFIG.PORT}"
