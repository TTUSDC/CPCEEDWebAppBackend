var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
  category : {type: String, enum: ['Career','Community','firstother','firstworkshop','mentor','other','outreath','professor','staff','misc']},
  contact : String,
  creator : String,
  datetime : Date,
  description : String,
  location : String,
  title : String
});

var Event = mongoose.model('Event', eventSchema);

module.exports = { Event };
