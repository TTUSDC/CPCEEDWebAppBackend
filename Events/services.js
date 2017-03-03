// This function return an object containing the eventuid of the newly created event.
var createEvent = function(req) {
  console.log(req);

  // TODO (zachlefevre): Write method and remove console.log().
  return req; // This will be replaced with an object containing the eventuid of the newly created event.
}

// This function returns an object containing the event represented by the eventuid.
var getEventByID = function(req) {
  // TODO (zachlefevre): Write method and remove console.log.
  console.log(req);
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
    }; // This will be replaced with an object containing the event represented by the eventuid.
}

// This function deletes the event represented by the eventuid.
var deleteEvent = function(req) {
  // TODO (zachlefevre): Write method and remove console.log().
  console.log(req);
  return req; // This will be removed.
}

// Returns an object containing every event.
var getAllEvents = function() {
  // TODO (zachlefevre): Write method and remove console.log().
  console.log("getAllEvents");
  return {
    "event1": 1234,
    "event2": 4312
  } // This will be replaced with an object containing every event.
}


module.exports = { createEvent, getEventByID, deleteEvent, getAllEvents };
