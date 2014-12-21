'use strict'

express = require 'express'

authRouter = require '../api/auth/auth-router'

apiRouter = express.Router()
apiRouter.stack = apiRouter.stack.concat(authRouter.stack)

module.exports = apiRouter
