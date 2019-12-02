"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSurvey = createSurvey;

var _require = require('../schemas/Survey.validation'),
    validateBodySurveyCreation = _require.validateBodySurveyCreation,
    validateBodySurveyUpdate = _require.validateBodySurveyUpdate;

var Survey = require('../models/Survey');

var SurveyQuestion = require('../models/SurveyQuestion');

var Question = require('../models/Question');
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
 * Crear encuesta
 * 1. Creando encuesta vacia
 * 2. Obteniendo las preguntas activas
 * 3. enlazando las preguntas con la encuesta creada
 * 
 * @param {Request} req 
 * @param {Response} res 
 */


function createSurvey(bodySurvey) {
  var emptySurvey, allQuestions;
  return regeneratorRuntime.async(function createSurvey$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(createEmptySurvey(bodySurvey));

        case 3:
          emptySurvey = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(getAllQuestions());

        case 6:
          allQuestions = _context2.sent;
          allQuestions.map(function _callee(question) {
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return regeneratorRuntime.awrap(linkQuestionWithSurvey(question, emptySurvey));

                  case 2:
                  case "end":
                    return _context.stop();
                }
              }
            });
          }); // return surveyCreated ? res.status(200).send(surveyCreated) : res.status(500).send("No se pudo crear el elemento");

          return _context2.abrupt("return", emptySurvey);

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          throw _context2.t0;

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 11]]);
}
/**
 * Crear encuesta vacia
 * @param {Object} bodyAttributes 
 */


function createEmptySurvey(bodyAttributes) {
  return Survey.create(bodyAttributes).then(function (result) {
    return result ? result : undefined;
  })["catch"](function (error) {
    throw error;
  });
}
/**
 * Obtener las preguntas activas
 */


function getAllQuestions() {
  return Question.findAll({
    where: {
      question_is_active: true
    }
  }).then(function (result) {
    return result ? result : undefined;
  })["catch"](function (error) {
    throw error;
  });
}
/**
 * Enlazar encuesta con las preguntas
 * 
 * @param {Object} question 
 * @param {Object} survey 
 * 
 */


function linkQuestionWithSurvey(question, survey) {
  return SurveyQuestion.create({
    fk_id_survey: survey.id_survey,
    fk_id_question: question.id_question,
    answer: ""
  }).then(function (result) {
    return result ? result : undefined;
  })["catch"](function (error) {
    throw error;
  });
}