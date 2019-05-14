const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')



const eventSchema = new mongoose.Schema({

  name: {
    type: String,
    required: 'Please enter a name for the event'
  },
  venue: {
    type: String,
    required: 'Please enter a venue for the event'
  },
  postcode: {
    type: String
  },
  skId: {
    type: String
  },
  date: {
    type: Date,
    required: 'Please enter a date for the event'
  },
  start: {
    type: String
  },
  finish: {
    type: String
  },
  image: {
    type: String
  },
  artist: {
    type: Array,
    required: 'Please enter the artists that are playing!'

  },
  price: {
    type: Number,
    required: 'Please specify a price'
  },
  description: {
    type: String,
    required: 'Please enter a description of the event'
  },
  minimumAge: {
    type: Number,
    required: 'Please specify the minimum age'
  },
  modifiedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }

}, {
  toJSON: {
    // whenever the user is converted to JSON
    transform(doc, json) {
      delete json.__v
      return json
    }
  }
})


eventSchema.plugin(uniqueValidator) // this makes the unqiue error nicer...

// same as `export default mongoose.model(...)`
module.exports = mongoose.model('Event', eventSchema)
