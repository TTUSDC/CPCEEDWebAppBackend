var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
  category : String,
  contact : String,
  creator : String,
  datetime : String,
  description : String,
  location : String,
  title : String
});

var Event = mongoose.model('eventModel', eventSchema, 'events');

module.exports = { eventModel };
