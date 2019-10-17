var express = require('express');
var router = express.Router();
var sport_controller = require('../controllers/sport_controller');

//POST for new sport
router.post('/addSport', sport_controller.add_sport);

//GET for sports
router.get('/sports',sport_controller.sports);

//DELETE for removing specific sport
router.delete('/deleteSport/:id',sport_controller.delete_sport);

// //PATCH for updating specific sport
router.patch('/updateSport/:id',sport_controller.update_sport);

//Get fot getting a specific sport
router.get('/getSport/:id',sport_controller.get_sport);

module.exports = router;