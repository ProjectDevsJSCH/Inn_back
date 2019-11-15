"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUser = createUser;
exports.authenticateUser = authenticateUser;
exports.getCurrentUser = getCurrentUser;
exports.deleteUser = deleteUser;
exports.updateUser = updateUser;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = require('../schemas/User.validations'),
    validateUserAuth = _require.validateUserAuth;

var _ = require('lodash');

var bcrypt = require('bcrypt');

var User = require('../models/User');
/**
 * Verificar la validéz de los parametros del body
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {CallableFunction} callBackValidation 
 */


function getValidParams(req, res, callBackValidation) {
  var _callBackValidation = callBackValidation(req.body),
      error = _callBackValidation.error;

  return error ? res.status(400).send(error.details[0].message) : req.body;
}
/**
 * Crear un usuario: 
 * 1. verificando la existencia del usuario,
 * 2. creando el hash de la contraseña
 * 3. guardando el usuario 
 * 
 * @param {Object} Attributes
 */


function createUser(_x) {
  return _createUser.apply(this, arguments);
}

function _createUser() {
  _createUser = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(userAttributes) {
    var userExists, passwordHashed, userSaved;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return verifyUser(userAttributes);

          case 3:
            userExists = _context.sent;

            if (!userExists) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", userExists);

          case 6:
            _context.next = 8;
            return hashPassword(userAttributes.user_password);

          case 8:
            passwordHashed = _context.sent;
            userAttributes.user_password = passwordHashed;
            _context.next = 12;
            return saveUser(userAttributes);

          case 12:
            userSaved = _context.sent;
            return _context.abrupt("return", userSaved);

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](0);
            throw _context.t0;

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 16]]);
  }));
  return _createUser.apply(this, arguments);
}

function verifyUser(userAttributes) {
  return new Promise(function (resolve, reject) {
    User.findOne({
      where: {
        user_email: userAttributes.user_email
      }
    }).then(function (result) {
      if (result) resolve("User already registered");
      resolve();
    })["catch"](function (error) {
      reject(error);
    });
  });
}

function hashPassword(password) {
  return new Promise(function (resolve, reject) {
    bcrypt.hash(password, 10).then(function (hash) {
      resolve(hash);
    })["catch"](function (error) {
      reject(error);
    });
  });
}

function saveUser(userAttributes) {
  return new Promise(function (resolve, reject) {
    User.create(userAttributes).then(function (created) {
      if (created) resolve(created);
    })["catch"](function (creationError) {
      reject(creationError);
    });
  });
}
/**
 * Validar email y constraseña de un usuario:
 * 1. Validando del body
 * 2. Verificando el correo y la contraseña
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @return {promise} promise
 */


function authenticateUser(_x2, _x3) {
  return _authenticateUser.apply(this, arguments);
}
/**
 * Retorna el usuario actual de acuerdo al token en el header
 *  
 * @param {Request} req 
 * @param {Response} res 
 * @return {promise} promise
 */


function _authenticateUser() {
  _authenticateUser = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var userAttributes;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            userAttributes = getValidParams(req, res, validateUserAuth);
            User.findOne({
              where: {
                user_email: userAttributes.user_email
              }
            }).then(function (result) {
              if (!result) return res.status(400).send("Invalid email or password");
              bcrypt.compare(userAttributes.user_password, result.user_password, function (compareError, compareResponse) {
                if (compareError) return res.status(500).send("Error verifying password: ", compareError);
                if (!compareResponse) return res.status(400).send("Invalid email or password");
                var token = result.generateAuthToken();
                return res.header('x-auth-token', token).send("User authenticated");
              });
            })["catch"](function (error) {
              return res.status(500).send(error);
            });

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _authenticateUser.apply(this, arguments);
}

function getCurrentUser(_x4, _x5) {
  return _getCurrentUser.apply(this, arguments);
}
/**
 * Eliminación de los usuarios con token de admin en el header 
 * y id en la ruta
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @return {Promise} promise
 */


function _getCurrentUser() {
  _getCurrentUser = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            // Encontrar el usuario con id en req.user.id_user
            User.findByPk(req.user.id_user).then(function (result) {
              if (!result) return res.status(400).send("User does not exist");
              var token = result.generateAuthToken();
              return res.header('x-auth-token', token).send(_.pick(result, ['id_user', 'name', 'email', 'is_admin']));
            })["catch"](function (error) {
              return res.status(500).send(error);
            });

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getCurrentUser.apply(this, arguments);
}

function deleteUser(_x6, _x7) {
  return _deleteUser.apply(this, arguments);
}
/**
 * Actualizar el usuario con token de admin en el header 
 * y id en la ruta
 * 
 * @param {Request} req 
 * @param {Response} res
 * @return {Promise} promise 
 */


function _deleteUser() {
  _deleteUser = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var id;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id; // Encontrar el usuario a borrar

            User.findByPk(id).then(function (result) {
              if (!result) return res.status(404).send("User not found");
              User.destroy({
                where: {
                  id_user: id
                }
              }).then(function (deleteResult) {
                if (deleteResult == 1) return res.status(200).send(_.pick(result, ['id_user', 'name', 'email', 'is_admin']));
              })["catch"](function (deleteError) {
                return res.status(409).send(deleteError);
              });
            })["catch"](function (error) {
              return res.status(500).send(error);
            });

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _deleteUser.apply(this, arguments);
}

function updateUser(_x8, _x9) {
  return _updateUser.apply(this, arguments);
}

function _updateUser() {
  _updateUser = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(req, res) {
    var id, userAttributes;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id; // Validacion del body

            userAttributes = getValidParams(req, res, validateBodyUserUpdate); // Hash del password

            if (userAttributes.password) {
              bcrypt.hash(userAttributes.password, 10).then(function (hash) {
                userAttributes.password = hash;
              });
            } // Actualizacion del usuario


            User.findByPk(id).then(function (result) {
              if (!result) return res.status(404).send("User not found");
              result.update(userAttributes).then(function (updateResult) {
                return res.status(200).send(_.pick(updateResult, ['id_user', 'name', 'email', 'is_admin']));
              })["catch"](function (updateError) {
                return res.status(409).send(updateError);
              });
            })["catch"](function (error) {
              return res.status(500).send(error);
            });

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _updateUser.apply(this, arguments);
}