var express = require('express');
var router = express.Router();
var team_controller = require('../controllers/team_controller');

//POST for new team
router.post('/addTeam', team_controller.add_team);

// GET for teams
router.get('/teams',team_controller.teams);

// //DELETE for removing specific team
router.delete('/deleteTeam/:id',team_controller.delete_team);

// // //PATCH for updating specific team
router.patch('/updateTeam/:id',team_controller.update_team);

//Get fot getting a specific team
router.get('/getTeam/:id',team_controller.get_team);

module.exports = router;