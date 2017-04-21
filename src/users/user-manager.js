const response = require('../objects/response.js');
const userModels = require('./user-models.js');

const User = userModels.User;
const Student = userModels.Student;
const Admin = userModels.Admin;

/**
 * Callback for sending the response to the client.
 *
 * @callback createResponse
 * @param {Object} err - The error.
 * @param {Number} id - The user UID.
 */

/**
 * Given User information, create a User.
 * @param {Object} data - The request body data.
 * @param {String} data.role - The user role.
 * @param {String} data.email - The user email address.
 * @param {String} data.password - The user password.
 * @param {createResponse} next - The callback function to run after this function
 *     finishes.
 */
const createUser = (data, next) => {
  // Ensure the required data is available.
  if (!data) {
    next({ err: 'Required parameters not found.' });
    return;
  }

  const info = {
    email: data.email,
    password: data.password,
    firstName: data.firstName,
    lastName: data.lastName,
    role: data.role,
  };

  let user;

  if (data.role === 'Student') {
    // Create a student.
    info.studentId = data.studentId;
    user = new Student(info);
  } else if (data.role === 'Admin') {
    // Create an admin.
    user = new Admin(info);
  } else {
    next({ err: 'Valid role not found.' });
    return;
  }

  User.findOne({ email: user.email }, (userErr, existingUser) => {
    if (userErr) {
      next(userErr);
    } else if (existingUser) {
      next({ err: 'Account with that email address already exists.' });
    } else {
      user.save((saveErr, dbUser) => {
        next(saveErr, (dbUser || {}).id);
      });
    }
  });
};

// modifyUser helper function
const newIfPresent = (newValue, oldValue) => {
  if (newValue === undefined || newValue == null) {
    return oldValue;
  }
  return newValue;
};

const modifyUser = (userUid, reqData, modifyCallback) => {
  User.findById(userUid, (err, user) => {
    if (err) {
      modifyCallback(err);
      return;
    }

    // Const, but user fields may change.
    const updatedUser = user;

    // If the modifying user's UID does not match the updatee's UID, and
    // the modifying user is not an admin, the user should not be modified.
    // TODO(ryanfaulkenberry100): Check if the above conditions exist.

    // Ensure the fields are defined, then reset each field to it's
    // corresponding request value if it's not null.

    // Fields shared by all users.
    updatedUser.firstName = newIfPresent(reqData.firstName, user.firstName);
    updatedUser.lastName = newIfPresent(reqData.lastName, user.lastName);
    updatedUser.email = newIfPresent(reqData.email, user.email);

    if (user.role === 'Student') {
      // Fields specific to students.
      updatedUser.approvalStatus =
          newIfPresent(reqData.approvalStatus, user.approvalStatus);
      updatedUser.points = newIfPresent(reqData.points, user.points);
      updatedUser.studentId = newIfPresent(reqData.studentId, user.studentId);
    }

    updatedUser.save(modifyCallback);
  });
  return new response.ResponseObject(200);
};

const deleteUser = (userUid, deleteCallback) => {
  User.findById(userUid, (err, user) => {
    if (err) {
      deleteCallback(err);
      return;
    }

    if (!user) {
      // TODO(ryanfaulkenberry100): Better error handling.
      deleteCallback({ message: 'User not found.' });
      return;
    }

    // If the deleting user's UID does not match the deletee's UID, and
    // the deleting user is not an admin, the user should not be deleted.
    // TODO(ryanfaulkenberry100): Check if the above conditions exist.

    user.remove(deleteCallback);
  });
  return new response.ResponseObject(200);
};

const getUser = (userUid, queryCallback) => {
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
