const mongoose = require('mongoose')

// const schema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   title: {
//     type: String,
//     required: true,
//   },
//   npi: {
//     type: String,
//     required: true,
//   },
//   schedule: [{
//     type: String,
//     required: true

//   }],
//   linkedProvider: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Provider'
//   },
//   coordinator: {
//       type: String,
//       required: true
//   },
//   alerts: [{
//     type: String,
//   }],

// })

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  alerts: [{
    type: String,
  }],

})

module.exports = mongoose.model('Provider', schema)
