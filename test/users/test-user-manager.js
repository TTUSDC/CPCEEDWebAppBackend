const mongoose = require("mongoose");
const mockgoose = require("mockgoose");
const assert = require("assert");
const chai = require("chai");
const expect = chai.expect;
chai.use(require('chai-moment'));
mockgoose(mongoose);

const userManager = require('../../src/users/user-manager.js');
const userModels = require('../../src/users/user-models.js');
const studentModel = userModels.Student;
const adminModel = userModels.Admin;

describe('userManager', () => {
  // Start mockgoose mock
  before((done) => { mongoose.connect('', done); });

  // Reinitialize the database before each case
  beforeEach((done) => {
    mockgoose.reset();
    done;
  });

  after((done) => { mongoose.unmock(done); });

  describe('#createUser', () => {
    it('should pass a created studnet to the callback', (done) => {
      const student = {
        approvalStatus: false,
        email: 'e@mail.com',
        firstName: 'Morty',
        lastName: 'Applesauce',
        points: {
          career: 0,
          community: 0,
          firstother: 0,
          firstworkshops: 0,
          mentor: 0,
          other: 0,
          outreach: 0,
          professor: 0,
          staff: 0,
          misc: 0
        },
        role: 'Student',
        studentId: 'randomUID'
      };

      userManager.createUser(student, (err, createdUser) => {
        expect(err).to.be.null;
        expect(createdUser.approvalStatus).to.be.false;
        expect(createdUser.email).to.be.equal(student.email);
        expect(createdUser.firstName).to.be.equal(student.firstName);
        expect(createdUser.lastName).to.be.equal(student.lastName);
        expect(createdUser.points).to.be.equal(student.points);
        expect(createdUser.role).to.be.equal('Student');
        expect(createdUser.studentId).to.be.equal(student.Id);

        User.findById(createdUser.id, (err, foundUser) => {
          expect(err).to.be.null;
          expect(foundUser.approvalStatus).to.be.false;
          expect(foundUser.email).to.be.equal(student.email);
          expect(foundUser.firstName).to.be.equal(student.firstName);
          expect(foundUser.lastName).to.be.equal(student.lastName);
          expect(foundUser.points).to.be.equal(student.points);
          expect(foundUser.role).to.be.equal('Student');
          expect(foundUser.studentId).to.be.equal(student.Id);
          done();
        });
      });
    });

    it('should pass a created admin to the callback', (done) => {
      const admin = {
        firstName: 'Holden',
        lastName: 'McGroin',
        email: 'hm@email.com',
        role: 'Admin'
      };

      userManager.createUser(admin, (err, createdUser) => {
        expect(err).to.be.null;
        expect(createdUser.firstName).to.be.equal(admin.firstName);
        expect(createdUser.lastName).to.be.equal(admin.lastName);
        expect(createdUser.email).to.be.equal(admin.email);
        expect(createdUser.role).to.be.equal('Admin');

        User.findById(createdUser.id, (err, foundUser) => {
          expect(err).to.be.null;
          expect(foundUser.email).to.be.equal(admin.email);
          expect(foundUser.firstName).to.be.equal(admin.firstName);
          expect(foundUser.lastName).to.be.equal(admin.lastName);
          expect(foundUser.role).to.be.equal('Admin');
          done();
        });
      });
    });
  });

  describe('#modifyUser', () => {
    it('should pass a modified user to the callback', (done) => {
      const originalStudent = new Student({
        approvalStatus: false,
        email: 'e@mail.com',
        firstName: 'Morty',
        lastName: 'Applesauce',
        points: {
          career: 0,
          community: 0,
          firstother: 0,
          firstworkshops: 0,
          mentor: 0,
          other: 0,
          outreach: 0,
          professor: 0,
          staff: 0,
          misc: 0
        },
        role: 'Student',
        studentId: 'randomUID'
      });

      const updatedStudent = {
        approvalStatus: false,
        email: 'different@email.com',
        firstName: 'Marty',
        lastName: 'Grapejuice',
        points: {
          career: 1,
          community: 2,
          firstother: 3,
          firstworkshops: 4,
          mentor: 5,
          other: 6,
          outreach: 7,
          professor: 8,
          staff: 9,
          misc: 10
        },
        role: 'Student',
        studentId: 'randomUID'
      }

      originalStudent.save((err, createdUser) => {
        expect(err).to.be.null;
        userManager.modifyUser(
          createdUser.id, updatedStudent, (err, actualUpdatedStudent) => {
            expect(err).to.be.null;
            expect(actualUpdatedStudent.approvalStatus)
              .to.be.equal(updatedStudent.approvalStatus);
            expect(actualUpdatedStudent.email)
              .to.be.equal(updatedStudent.email);
            expect(actualUpdatedStudent.firstName)
              .to.be.equal(updatedStudent.firstName);
            expect(actualUpdatedStudent.lastName)
              .to.be.equal(updatedStudent.lastName);
            expect(actualUpdatedStudent.points)
              .to.be.equal(updatedStudent.points);
            expect(actualUpdatedStudent.role)
              .to.be.equal('Student');
            expect(actualUpdatedStudent.studentId)
              .to.be.equal(updatedStudent.studentId);
            done();
          });
      });
    });

    it('should pass a modified user to the callback', (done) => {
      const originalAdmin  = new Admin({
        firstName: 'Holden',
        lastName: 'McGroin',
        email: 'hm@email.com',
        role: 'Admin'
      });

      const updatedAdmin = {
        firstName: 'Alex',
        lastName: 'Jones',
        email: 'alex@jones.com',
        role: 'Admin'
      };

      originalAdmin.save((err, createdUser) => {
        expect(err).to.be.null;
        userManager.modifyUser(
          createdUser.id, updatedAdmin, (err, actualUpdatedAdmin) => {
            expect(err).to.be.null;
            expect(actualUpdatedAdmin.firstName)
              .to.be.equal(updatedAdmin.firstName);
            expect(actualUpdatedAdmin.lastName)
              .to.be.equal(updatedAdmin.lastName);
            expect(actualUpdatedAdmin.email).to.be.equal(updatedAdmin.email);
            expect(actualUpdatedAdmin.role).to.be.equal('Admin');
          });
      });
    });
  });

  describe('#deleteUser', (done) => {
    it('should delete the Student', (done) => {
      const student = new Student({
        approvalStatus: false,
        email: 'e@mail.com',
        firstName: 'Morty',
        lastName: 'Applesauce',
        points: {
          career: 0,
          community: 0,
          firstother: 0,
          firstworkshops: 0,
          mentor: 0,
          other: 0,
          outreach: 0,
          professor: 0,
          staff: 0,
          misc: 0
        },
        role: 'Student',
        studentId: 'randomUID'
      });

      student.save((err, createdUser) => {
        expect(err).to.be.null;
        userManager.deleteUser(
          createdUser.id, (err, deletedUser) => {
            expect(err).to.be.null;
            expect(deletedUser.approvalStatus)
              .to.be.equal(student.approvalStatus)
            expect(deletedUser.email).to.be.equal(student.email);
            expect(deletedUser.firstName).to.be.equal(student.firstName);
            expect(deletedUser.lastName).to.be.equal(student.lastName);
            expect(deletedUser.points).to.be.equal(student.points);
            expect(deletedUser.role).to.be.equal('Student');
            expect(deletedUser.studentId).to.be.equal(student.studentId);

            User.findById(createdUser.id, (err, foundUser) => {
              expect(foundReport).to.be.null;
              done();
            });
          });
      });
    });

    it('should delete the admin', (done) => {
      const admin = new Admin({
        firstName: 'Holden',
        lastName: 'McGroin',
        email: 'hm@email.com',
        role: 'Admin'
      });

      admin.save((err, createdUser) => {
        expect(err).to.be.null;
        userManager.deleteUser(
          createdUser.id, (err, deletedUser) => {
            expect(err).to.be.null;
            expect(deletedUser.firstName).to.be.equal(admin.firstName);
            expect(deleteUser.lastName).to.be.equal(admin.lastName);
            expect(deleteUser.email).to.be.equal(admin.email);
            expect(deleteUser.role).to.be.equal('Admin');

            User.findById(createdUser.id, (err, foundUser) => {
              expect(foundUser).to.be.null;
              done();
            });
          });
      });
    });
  });

  describe('#getUser', (done) => {
    it('should pass the student with the given id to the callback', (done) => {
      const student = new Student({
        approvalStatus: false,
        email: 'e@mail.com',
        firstName: 'Morty',
        lastName: 'Applesauce',
        points: {
          career: 0,
          community: 0,
          firstother: 0,
          firstworkshops: 0,
          mentor: 0,
          other: 0,
          outreach: 0,
          professor: 0,
          staff: 0,
          misc: 0
        },
        role: 'Student',
        studentId: 'randomUID'
      });

      student.save((err, createdUser) => {
        expect(err).to.be.null;
        userManager.getUser(createdUser.id, (err, foundUser) => {
          expect(err).to.be.null;
          expect(foundUser.approvalStatus).to.be.equal(student.approvalStatus);
          expect(foundUser.email).to.be.equal(student.email);
          expect(foundUser.firstName).to.be.equal(student.firstName);
          expect(foundUser.lastName).to.be.equal(student.lastName);
          expect(foundUser.points).to.be.equal(student.email);
          expect(foundUser.role).to.be.equal('Student');
          expect(foundUser.studentId).to.be.equal(student.studentId);
          done();
        });
      });
    });

    it('should pass the admin with the given id to the callback', (done) => {
      const admin = new Admin({
        firstName: 'Holden',
        lastName: 'McGroin',
        email: 'hm@email.com',
        role: 'Admin'
      });

      admin.save((err, createdUser) => {
        expect(err).to.be.null;
        userManager.getUser(createdUser.id, (err, foundUser) => {
          expect(err).to.be.null;
          expect(foundUser.email).to.be.equal(admin.email);
          expect(foundUser.firstName).to.be.equal(admin.firstName);
          expect(foundUser.lastName).to.be.equal(admin.lastName);
          expect(foundUser.role).to.be.equal('Admin');
          done();
        });
      });
    });
  });
});
