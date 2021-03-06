const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { isAdmin } = require('../middleware/admin');

const { createSurvey, saveAnswerSurveyQuestion, getQuestionsBySurvey, getchallangeState} = require('../controllers/Survey.controller');

/** Rutas para /api/surveys/

/**
 * Crear una encuesta con body (solo para admin).
 * Además enlaza las preguntas correspondientes
 * {"survey_date", "user_id_creator"}
 */
router.post('/', [auth, isAdmin], createSurvey);

router.get('/:id_challenge', getQuestionsBySurvey);
router.put('/', [auth], saveAnswerSurveyQuestion);
router.get('/:id_challenge', getchallangeState);


module.exports = router;