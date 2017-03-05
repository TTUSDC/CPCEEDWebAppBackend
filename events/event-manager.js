var eventModels = require('./event-models.js');
var Event = eventModels.Event;
// This function return an object containing the event UID of the newly created event.
var createEvent = function(reqData, locals, createCallback) {
  var event = new Event({
    category: reqData.category,
    contact: reqData.contact ,
    creator: reqData.creator,
    datetime: new Date(reqData.datetime),
    description: reqData.description,
    location: reqData.location,
    title: reqData.title
  });

  event.save(createCallback)

  return {
    "eventUid": event.id
  };
}

// This function returns an object containing the event represented by the event UID.
var getEventByID = function(req, locals, queryCallback) {
  // TODO (zachlefevre): Write method and remove console.log.
  console.log(req);
   // TODO (zachlefevre): Replace the return object with an object containing the event represented by the event UID.
  return {
    "event": {
      "category" : "ENUM/STRING",
      "contact" : "John Doe",
      "creator" : 987654321,
      "datetime" : "December 25 2012",
      "description" : "Description of the holidays",
      "location" : "Holden Hall",
      "title" : "The Holidays"
    }
  };
}

// This function deletes the event represented by the event UID.
var deleteEvent = function(req, locals, deleteCallback) {
  // TODO (zachlefevre): Write method and remove console.log().
  console.log(req);
  return {
    "deleted": true
  };
}

// Returns an object containing every event.
var getAllEvents = function(locals, queryCallback) {
  // TODO (zachlefevre): Write method and remove console.log().
  console.log("getAllEvents");
   // TODO (zachlefevre): Replace the return object with an object containing every event.
  return {
    "event1": 1234,
    "event2": 4312
  }
}


module.exports = { createEvent, getEventByID, deleteEvent, getAllEvents };
