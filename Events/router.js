var express = require('express');
var eventService = require('./services.js');
var eventRouter = express.Router();

//Create Event
eventRouter.post('/', function (req, res){
  var response = eventService.createEvent(req.body);
  //TODO: send res
  //TODO: send status
});

eventRouter.get('/:eventuid', function (req, res){
  var response = eventService.getEventByID(req.params);
  //TODO: send res
})

eventRouter.delete('/:eventuid', function (req, res){
  var response = eventService.deleteEvent(req.params);
  //TODO: send res
  //TODO: send status
})

eventRouter.get('/', function (req, res){
  var response = eventService.getAllEvents()
  //TODO: remove res.send
  res.send("get all events");
  //TODO: send res
})

module.exports = { eventRouter };
