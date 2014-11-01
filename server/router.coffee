'use strict';

express = require('express')
path = require('path')

router = express.Router()

template = path.join(__dirname, '..', 'client/templates/server-side.base.html')

router.get('*', (req, res) ->
  res.sendFile(template)
)

module.exports = router;
