// This function return a json containing the eventuid of the newly created event.
var createEvent = function(req) {
  console.log(req);

  // TODO (zachlefevre): Write method and remove console.log().
  return req; // This will be replaced with a json containing the eventuid of the newly created event.
}

// This function returns a json containing the event represented by the eventuid.
var getEventByID = function(req) {
  console.log(req);
  // TODO (zachlefevre): Write method and remove console.log.
  return {
    "event": {
      "category" : "ENUM/STRING",
      "contact" : "STRING",
      "creator" : "USERUID",
      "datetime" : "DATE-TIME STRING",
      "description" : "STRING",
      "location" : "STRING",
      "title" : "STRING"
}
    }; // This will be replaced with a json containing the event represented by the eventuid.
}

// This function deletes the event represented by the eventuid.
var deleteEvent = function(req) {
  console.log(req);
  // TODO (zachlefevre): Write method and remove console.log().
  return req; // This will be removed.
}

// Returns a json containing every event.
var getAllEvents = function() {
  console.log("getAllEvents");
  // TODO (zachlefevre): Write method and remove console.log().
  return {
    "event1": 1234,
    "event2": 4312
  } // This will be replaced with a json containing every event.
}


module.exports = { createEvent, getEventByID, deleteEvent, getAllEvents };
