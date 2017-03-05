var express = require('express');
var eventService = require('./event-manager.js');
var eventRouter = express.Router();

eventRouter.post('/', (req, res) => {
  var response = eventService.createEvent(req.body, {}, (err, event) => {
    if (err){
      //TODO (zachlefevre): Complete error handling.
      res.status(400).send(err).end();
      return;
    }

    console.log({
      message: 'createEvent successful',
      id: event.id
    })
    res.status(201).send(response);
  });
});

eventRouter.get('/:eventuid', (req, res) => {
  eventService.getEventByID(req.params.eventuid, req.body, {}, (err, event) => {
    if (err){
      //TODO (zachlefevre): Complete error handling.
      res.status(400).send(err).end();
      return;
    }

    console.log({
      message: 'getEventByID succesful',
      id: event.id
    })
    res.status(200).send(event).end();
  });
})

eventRouter.delete('/:eventuid', (req, res) => {
  var response = eventService.deleteEvent(req.params.eventuid, req.body, {}, (err, event) => {
    if (err){
      //TODO (zachlefevre): Complete error handling.
      res.status(400).send(err).end();
      return;
    }

    console.log({
      message: 'deleteEvent successful',
      id: event.id
    })
    res.status(201).send(response);
  });
})

eventRouter.get('/', (req, res) => {
  var response = eventService.getAllEvents(req.body, {}, (err, event) => {
    if (err){
      //TODO (zachlefevre): Complete error handling.
      res.status(400).send(err).end();
      return;
    }

    console.log({
      message: 'getAllEvents successful',
      id: event.id
    })
    res.status(201).send(response);
  });
})

module.exports = { eventRouter };
