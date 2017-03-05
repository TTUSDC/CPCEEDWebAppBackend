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
var getEventByID = function(eventUid, reqData, locals, queryCallback) {
  Event.findById(eventUid, (err, event) => {
    if(err) {
      queryCallback(err);
      return;
    }
      queryCallback(err, event);
  })

};

// This function deletes the event represented by the event UID.
var deleteEvent = function(eventUid, reqData, locals, deleteCallback) {
  // TODO (zachlefevre): Write method and remove console.log().
  console.log(req);
  return {
    "deleted": true
  };
}

// Returns an object containing every event.
var getAllEvents = function(reqData, locals, queryCallback) {
  // TODO (zachlefevre): Write method and remove console.log().
  console.log("getAllEvents");
   // TODO (zachlefevre): Replace the return object with an object containing every event.
  return {
    "event1": 1234,
    "event2": 4312
  }
}


module.exports = { createEvent, getEventByID, deleteEvent, getAllEvents };
