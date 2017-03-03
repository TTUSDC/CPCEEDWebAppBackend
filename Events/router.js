var express = require('express');
var eventService = require('./services.js');
var eventRouter = express.Router();

eventRouter.post('/', (req, res) => {
  var response = eventService.createEvent(req.body);
  res.status(201).send(response);
});

eventRouter.get('/:eventuid', (req, res) => {
  var response = eventService.getEventByID(req.params);
  res.send(response);
})

eventRouter.delete('/:eventuid', (req, res) => {
  var response = eventService.deleteEvent(req.params);
  res.status(200).send(response);
})

eventRouter.get('/', (req, res) => {
  var response = eventService.getAllEvents()
  res.send(response);
})

module.exports = { eventRouter };
