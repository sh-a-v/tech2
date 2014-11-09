(function() {
  'use strict';
  var UserSchema, userSchema;

  userSchema = new mongoose.Schema({
    local: {
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      }
    },
    publisher: {
      type: Boolean,
      "default": false
    },
    admin: {
      type: Boolean,
      "default": false
    }
  });

  (function(_this) {
    return (function() {
      return userSchema = new mongoose.Schema({
        local: {
          email: {
            type: String,
            required: true,
            unique: true
          },
          password: {
            type: String,
            required: true
          }
        },
        publisher: {
          type: Boolean,
          "default": false
        },
        admin: {
          type: Boolean,
          "default": false
        }
      });
    });
  })(this);

  passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, email, password, done) {
    return 1;
  }));

  UserSchema = new mongoose.Schema({
    local: {
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      }
    },
    publisher: {
      type: Boolean,
      "default": false
    },
    admin: {
      type: Boolean,
      "default": false
    }
  });

  passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, email, password, done) {
    return 1;
  }));

  if (err) {
    return done(err);
  }

}).call(this);
