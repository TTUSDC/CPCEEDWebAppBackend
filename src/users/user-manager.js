var response = require('../Objects/response.js');
var userModels = require('./user-models.js');
var Student = userModels.Student;
var Admin = userModels.Admin;

var createUser = (reqData, createCallback) => {
  var user;
  if (reqData.role == 'Student') {
    // Create new student.
    user = new Student({
      approvalStatus: false,
      email: reqData.email,
      firstName: reqData.firstName,
      lastName: reqData.lastName,
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
      studentId: reqData.studentId
    });

  } else if (reqData.role == 'Admin') {
    // Create new admin.
    user = new Admin({
      email: reqData.email,
      firstName: reqData.firstName,
      lastName: reqData.lastName,
      role: 'Admin'
    });

  } else {
  // TODO(ryanfaulkenberry100): Better error handling for invalid user roles
  createCallback({message: "Invalid user role"});
  return;
  }

  user.save(createCallback);
  return new response.ResponseObject(200);
};

var modifyUser = (userUid, reqData, modifyCallback) => {
  User.findById(userUid, (err, user) => {
    if (err) {
      modifyCallback(err);
      return;
    }

    // If the modifying user's UID does not match the updatee's UID, and
    // the modifying user is not an admin, the user should not be modified.
    // TODO(ryanfaulkenberry100): Check if the above conditions exist.

    // Ensure the fields are defined, then reset each field to it's
    // corresponding request value if it's not null.

    // Fields shared by all users.
    user.firstName = newIfPresent(reqData.firstName, user.firstName);
    user.lastName = newIfPresent(reqData.lastName, user.lastName);
    user.email = newIfPresent(reqData.email, user.email);

    if (user.role == userModels.modelName) {
      // Fields specific to students.
      user.approvalStatus =
          newIfPresent(reqData.approvalStatus, user.approvalStatus);
      user.points = newIfPresent(reqData.points, user.points);
      user.studentId = newIfPresent(reqData.studentId, user.studentId);
    }

    report.save(modifyCallback);
  });
  return new response.ResponseObject(200);
};

var deleteUser = (userUid, deleteCallback) => {
  User.findById(userUid, (err, user) => {
    if (err) {
      deleteCallback(err);
      return;
    }

    if (!user) {
      // TODO(ryanfaulkenberry100): Better error handling.
      deleteCallback({message: 'Report not found.'});
      return;
    }

    // If the deleting user's UID does not match the deletee's UID, and
    // the deleting user is not an admin, the user should not be deleted.
    // TODO(ryanfaulkenberry100): Check if the above conditions exist.

    user.remove(deleteCallback);
  });
  return new response.ResponseObject(200);
};

var getUser = (userUid, queryCallback) => {
  User.findById(userUid, (err, user) => {
    if (err) {
      queryCallback(err);
      return;
    }

    // If the requesting user's UID does not match the queree's UID, and
    // the requesting user is not an admin, the user should not be returned.
    // TODO(ryanfaulkenberry100): Check if the above conditions exist.

    queryCallback(err, user);
  });
  return new response.ResponseObject(200);
};

module.exports = { createUser, modifyUser, deleteUser, getUser };
