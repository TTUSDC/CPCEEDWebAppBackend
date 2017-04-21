const mockgoose = require('mockgoose');
const mongoose = require('mongoose');
const chai = require('chai');
const chaiMoment = require('chai-moment');
const userManager = require('../../src/users/user-manager');
const userModels = require('../../src/users/user-models');

const expect = chai.expect;
const should = chai.should();
const Admin = userModels.Admin;
const Student = userModels.Student;
const User = userModels.User;

chai.use(chaiMoment);
mockgoose(mongoose);

describe('userManager', () => {
  // Connect to the database.
  before((done) => { mongoose.connect('', done); });

  // Clear the database before each test case.
  beforeEach((done) => {
    mockgoose.reset();
    done();
  });

  after((done) => { mongoose.unmock(done); });

  describe('#createStudent', () => {
    it('should pass a uid to the callback', (done) => {
      const student = {
        email: 'test@test.com',
        password: 'P@ssw0rd!',
        firstName: 'Test',
        lastName: 'User',
        role: 'Student',
        studentId: '',
      };

      userManager.createUser(student, (createErr, uid) => {
        expect(createErr).to.be.null;
        expect(uid).to.be.a('string');

        Student.findById(uid, (studentErr, foundStudent) => {
          expect(studentErr).to.be.null;
          expect(foundStudent.isApproved).to.be.false;
          expect(foundStudent.email).to.be.equal(student.email);
          expect(foundStudent.firstName).to.be.equal(student.firstName);
          expect(foundStudent.lastName).to.be.equal(student.lastName);
          expect(foundStudent.role).to.be.equal(student.role);
          expect(foundStudent.studentId).to.be.equal(student.studentId);
          foundStudent.comparePassword(student.password, (passwordErr, isMatch) => {
            expect(isMatch).to.be.true;
          });
          done();
        });
      });
    });

    it('should pass an error to the callback', (done) => {
      const student = {
        email: 'test@test.com',
        firstName: 'Test',
        lastName: 'User',
        role: 'Student',
        studentId: '',
      };

      userManager.createUser(student, (createErr, uid) => {
        should.exist(createErr);
        should.not.exist(uid);
        done();
      });
    });
  });

  describe('#createAdmin', () => {
    it('should pass a uid to the callback', (done) => {
      const admin = {
        email: 'test@test.com',
        password: 'P@ssw0rd!',
        firstName: 'Test',
        lastName: 'User',
        role: 'Admin',
      };

      userManager.createUser(admin, (createErr, uid) => {
        expect(createErr).to.be.null;
        expect(uid).to.be.a('string');

        Admin.findById(uid, (studentErr, foundStudent) => {
          expect(studentErr).to.be.null;
          expect(foundStudent.isApproved).to.be.false;
          expect(foundStudent.email).to.be.equal(admin.email);
          expect(foundStudent.firstName).to.be.equal(admin.firstName);
          expect(foundStudent.lastName).to.be.equal(admin.lastName);
          expect(foundStudent.role).to.be.equal(admin.role);
          expect(foundStudent.studentId).to.be.equal(admin.studentId);
          foundStudent.comparePassword(admin.password, (passwordErr, isMatch) => {
            expect(isMatch).to.be.true;
          });
          done();
        });
      });
    });

    it('should pass an error to the callback', (done) => {
      const admin = {
        email: 'test@test.com',
        firstName: 'Test',
        lastName: 'User',
        role: 'Student',
        studentId: '',
      };

      userManager.createUser(admin, (createErr, uid) => {
        should.exist(createErr);
        should.not.exist(uid);
        done();
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
          misc: 0,
        },
        role: 'Student',
        studentId: 'randomUID',
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
          misc: 10,
        },
        role: 'Student',
        studentId: 'randomUID',
      };

      originalStudent.save((err, createdUser) => {
        expect(err).to.be.null;
        userManager.modifyUser(
          createdUser.id, updatedStudent, (Modifyerr, actualUpdatedStudent) => {
            expect(Modifyerr).to.be.null;
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
      const originalAdmin = new Admin({
        firstName: 'Holden',
        lastName: 'McGroin',
        email: 'hm@email.com',
        role: 'Admin',
      });

      const updatedAdmin = {
        firstName: 'Alex',
        lastName: 'Jones',
        email: 'alex@jones.com',
        role: 'Admin',
      };

      originalAdmin.save((err, createdUser) => {
        expect(err).to.be.null;
        userManager.modifyUser(
          createdUser.id, updatedAdmin, (Modifyerr, actualUpdatedAdmin) => {
            expect(Modifyerr).to.be.null;
            expect(actualUpdatedAdmin.firstName)
              .to.be.equal(updatedAdmin.firstName);
            expect(actualUpdatedAdmin.lastName)
              .to.be.equal(updatedAdmin.lastName);
            expect(actualUpdatedAdmin.email).to.be.equal(updatedAdmin.email);
            expect(actualUpdatedAdmin.role).to.be.equal('Admin');
            done();
          });
      });
    });
  });

  describe('#deleteUser', () => {
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
          misc: 0,
        },
        role: 'Student',
        studentId: 'randomUID',
      });

      student.save((err, createdUser) => {
        expect(err).to.be.null;
        userManager.deleteUser(
          createdUser.id, (createErr, deletedUser) => {
            expect(createErr).to.be.null;
            expect(deletedUser.approvalStatus)
              .to.be.equal(student.approvalStatus);
            expect(deletedUser.email).to.be.equal(student.email);
            expect(deletedUser.firstName).to.be.equal(student.firstName);
            expect(deletedUser.lastName).to.be.equal(student.lastName);
            expect(deletedUser.points).to.be.equal(student.points);
            expect(deletedUser.role).to.be.equal('Student');
            expect(deletedUser.studentId).to.be.equal(student.studentId);

            User.findById(createdUser.id, (findErr, foundUser) => {
              expect(findErr).to.be.null;
              expect(foundUser).to.be.null;
              done();
            });
          });
      });
    });

    it('should delete the Admin', (done) => {
      const admin = new Admin({
        firstName: 'Holden',
        lastName: 'McGroin',
        email: 'hm@email.com',
        role: 'Admin',
      });

      admin.save((err, createdUser) => {
        expect(err).to.be.null;
        userManager.deleteUser(
          createdUser.id, (createErr, deletedUser) => {
            expect(createErr).to.be.null;
            expect(deletedUser.firstName).to.be.equal(admin.firstName);
            expect(deletedUser.lastName).to.be.equal(admin.lastName);
            expect(deletedUser.email).to.be.equal(admin.email);
            expect(deletedUser.role).to.be.equal('Admin');

            User.findById(createdUser.id, (findErr, foundUser) => {
              expect(findErr).to.be.null;
              expect(foundUser).to.be.null;
              done();
            });
          });
      });
    });
  });

  describe('#getUser', () => {
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
          misc: 0,
        },
        role: 'Student',
        studentId: 'randomUID',
      });

      student.save((err, createdUser) => {
        expect(err).to.be.null;
        userManager.getUser(createdUser.id, (queryErr, foundUser) => {
          expect(queryErr).to.be.null;
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
        role: 'Admin',
      });

      admin.save((err, createdUser) => {
        expect(err).to.be.null;
        userManager.getUser(createdUser.id, (queryErr, foundUser) => {
          expect(queryErr).to.be.null;
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
