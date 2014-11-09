(function() {
  'use strict';
  var userSchema;

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

}).call(this);
