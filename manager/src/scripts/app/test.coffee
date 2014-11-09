'use strict'

userSchema = new mongoose.Schema(
  local:
    email: type: String, required: true, unique: true
    password: type: String, required: true

  publisher: type: Boolean, default: false
  admin: type: Boolean, default: false
)

() =>
  userSchema = new mongoose.Schema(
    local:
      email: type: String, required: true, unique: true
      password: type: String, required: true

    publisher: type: Boolean, default: false
    admin: type: Boolean, default: false
  )
