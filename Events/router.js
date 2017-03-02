var express = require('express');
var eventService = require('./services.js');
var eventRouter = express.Router();

eventRouter.post('/', (req, res) => {
  var response = eventService.createEvent(req.body);
  res.send(response);
  //TODO (zachlefevre): Send an HTTP status corresponding to CREATED.
});

eventRouter.get('/:eventuid', (req, res) => {
  var response = eventService.getEventByID(req.params);
  res.send(response);
})

eventRouter.delete('/:eventuid', (req, res) => {
  var response = eventService.deleteEvent(req.params);
  res.send(response);
  // TODO (zachlefevre): Send an HTTP status corresponding to DELETED.
})

eventRouter.get('/', (req, res) => {
  var response = eventService.getAllEvents()
  res.send(response);
})

module.exports = { eventRouter };
