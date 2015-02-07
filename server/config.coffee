'use strict'

# create and use config-local for dev

try
  CONFIG = require('./config-local')
catch err
  CONFIG =
    PORT: 1337  # run on http://localhost:1337

    SECRET: ''  # 'techreuhrgejrvnfhuriuverviehjkloiijdbc42634'
    DATABASE_URL: ''  # 'mongodb://test:test_3546345689@ds046371.mongolab.com:45089/test'

    MAIL_SERVICE: ''  # 'Gmail'
    MAIL_USER: ''  # 'test@google.com'
    MAIL_PASSWORD: ''  # 'iuerw45fheir'

    CLIENT:
      STATIC_FILES_PATH: ''  # 'client/build'
      BASE_TEMPLATE_PATH: ''  # 'client/build/templates/index.html'

    MANAGER:
      STATIC_FILES_PATH: ''
      BASE_TEMPLATE_PATH: ''

module.exports = CONFIG
