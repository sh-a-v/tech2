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

passport.use(
    'local',
    new LocalStrategy(
      usernameField: 'email'
      passwordField: 'password'
      passReqToCallback: true,

      (req, email, password, done) ->
        1
    )
)


UserSchema = new mongoose.Schema
  local:
    email: type: String, required: true, unique: true
    password: type: String, required: true

  publisher: type: Boolean, default: false
  admin: type: Boolean, default: false


passport.use 'local',
  new LocalStrategy
    usernameField: 'email'
    passwordField: 'password'
    passReqToCallback: true,

    (req, email, password, done) ->
      1

return done(err) if err