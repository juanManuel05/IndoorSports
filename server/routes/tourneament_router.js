var express = require('express');
var router = express.Router();
var tourneament_controller = require('../controllers/tourneament_controller');

//POST for new team
router.post('/add', tourneament_controller.add);

//DELETE for deletin all teams
router.delete('/deleteAll',tourneament_controller.deleteAll);

// GET for teams takinf part of the current Tourneament
router.get('/teamsInTourneament/:id',tourneament_controller.teamsInTourneament);

//DELETE for removing specific team
router.delete('/delete/:id',tourneament_controller.delete_tourneament);

//PATCH for updating specific team
router.patch('/update/:id',tourneament_controller.update_tourneament);


//Get fot getting a specific team
router.get('/all',tourneament_controller.tourneaments);

//Get fot getting a specific team
router.get('/get/:id',tourneament_controller.get_tourneament);

module.exports = router;