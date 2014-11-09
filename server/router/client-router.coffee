'use strict';

CONFIG = require('../config')
express = require('express')
path = require('path')

router = express.Router()
template = path.join(__dirname, '../..', CONFIG.CLIENT.BASE_TEMPLATE_PATH)

router.get '*', (req, res) ->
  res.sendFile(template)

module.exports = router
