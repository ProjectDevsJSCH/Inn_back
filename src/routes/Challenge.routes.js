const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { isAdmin } = require('../middleware/admin');


const {
   createChallenge,
   getAllChallenges
} = require('../controllers/Challenge.controller');


/*** Rutas para /api/challenge*/

/** 
 * Crear un reto con body (Solo para admin)
 * {"id_challenge","fk_id_survey","fk_id_company","challenge_name","challenge_description","fk_id_challenge_state"}
 */
router.post('/', [auth, isAdmin], createChallenge);

/**
 * Obtener todos los retos
 */
router.get('/', [auth], getAllChallenges);


module.exports = router;