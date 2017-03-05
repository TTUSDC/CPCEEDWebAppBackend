var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
  category : String,
  contact : String,
  creator : String,
  datetime : String,
  description : String,
  location : String,
  title : String
});

var Event = mongoose.model('Event', eventSchema, 'events');

module.exports = { eventModel };
