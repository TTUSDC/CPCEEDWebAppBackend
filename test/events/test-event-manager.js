const mockgoose = require('mockgoose');
const mongoose = require('mongoose');
const chai = require('chai');
const eventManager = require('../../src/events/event-manager');
const eventModels = require('../../src/events/event-models');

chai.use(require('chai-shallow-deep-equal'));
chai.use(require('chai-moment'));

const expect = chai.expect;
const Event = eventModels.Event;

mockgoose(mongoose);

describe('eventManager', () => {
  const getDefaultTestEvent = () => {
    const defaultTestEvent = {
      creator: 'creatoruid123',
      category: 'eventcategory',
      datetime: '2017-04-19T20:34:00.000Z',
      location: 'ECE 204',
      title: 'Awesome Event',
      description: 'This event has an awesome description',
    };
    return defaultTestEvent;
  };

  before((done) => { mongoose.connect('', done); });

  beforeEach((done) => {
    mockgoose.reset();
    done();
  });

  after((done) => { mongoose.unmock(done); });

  describe('#createEvent', () => {
    it('should pass a created and saved event to the callback', (done) => {
      const testEvent = getDefaultTestEvent();
      const testDatetime = testEvent.datetime;
      eventManager.createEvent(testEvent, {}, (createErr, createdEvent) => {
        // The next line is to handle the fact that datetimes when equivalent don't
        // mean equal when compared.
        delete testEvent.datetime;
        expect(createErr).to.be.null;
        expect(createdEvent).to.not.be.null;
        expect(createdEvent.datetime).to.be.sameMoment(testDatetime);
        expect(createdEvent).to.shallowDeepEqual(testEvent);
        Event.findById(createdEvent.id, (findErr, foundEvent) => {
          expect(findErr).to.be.null;
          expect(foundEvent).to.not.be.null;
          expect(foundEvent.datetime).to.be.sameMoment(testDatetime);
          expect(foundEvent).to.shallowDeepEqual(testEvent);
          done();
        });
      });
    });
  });

  describe('#modifyEvent', () => {
    it('should pass a modified and saved event to the callback', (done) => {
      const originalEvent = new Event(getDefaultTestEvent());
      const updatedEvent = {
        creator: 'updatedCreatorId',
        category: 'eventcategoryish',
        datetime: '2017-05-19T20:34:00.000Z',
        location: 'ECE 204',
        title: 'Not Awesome Event',
        description: 'This event had an awesome description',
      };
      const testDatetime = updatedEvent.datetime;
      originalEvent.save((saveErr, createdEvent) => {
        expect(saveErr).to.be.null;
        expect(createdEvent).to.not.be.null;
        eventManager.modifyEvent(createdEvent.id, updatedEvent, {},
          (modifyErr, realUpdatedEvent) => {
            // The next line is to handle the fact that datetimes when
            // equivalent don't mean equal when compared.
            delete updatedEvent.datetime;
            expect(modifyErr).to.be.null;
            expect(realUpdatedEvent).to.not.be.null;
            expect(realUpdatedEvent.datetime)
              .to.be.sameMoment(testDatetime);
            expect(realUpdatedEvent).to.shallowDeepEqual(updatedEvent);
            Event.findById(realUpdatedEvent.id, (findErr, foundEvent) => {
              expect(findErr).to.be.null;
              expect(foundEvent).to.not.be.null;
              expect(foundEvent.datetime).to.be.sameMoment(testDatetime);
              expect(foundEvent).to.shallowDeepEqual(updatedEvent);
              done();
            });
          });
      });
    });
  });
});