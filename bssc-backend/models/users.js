const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true,
    unique: true
  },
  permissions: [
    {
      type: String
    }
  ]

})

module.exports = mongoose.model('User', schema)
