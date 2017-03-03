// This function return an object containing the event UID of the newly created event.
var createEvent = function(req) {
  // TODO (zachlefevre): Write method and remove console.log().
  console.log(req);
  // TODO :(zachlefevre): Replace return object with an object containing the event UID of the newly created event.
  return req;
}

// This function returns an object containing the event represented by the event UID.
var getEventByID = function(req) {
  // TODO (zachlefevre): Write method and remove console.log.
  console.log(req);
   // TODO (zachlefevre): Replace the return object with an object containing the event represented by the event UID.
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
  };
}

// This function deletes the event represented by the event UID.
var deleteEvent = function(req) {
  // TODO (zachlefevre): Write method and remove console.log().
  console.log(req);
  // TODO (zlefevre): Remove this return statement.
  return req;
}

// Returns an object containing every event.
var getAllEvents = function() {
  // TODO (zachlefevre): Write method and remove console.log().
  console.log("getAllEvents");
   // TODO (zachlefevre): Replace the return object with an object containing every event.
  return {
    "event1": 1234,
    "event2": 4312
  }
}


module.exports = { createEvent, getEventByID, deleteEvent, getAllEvents };
