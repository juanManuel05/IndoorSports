var express = require('express');
var router = express.Router();
var player_controller = require('../controllers/player_controller');
var sport_controller = require('../controllers/sport_controller');
var team_controller = require('../controllers/team_controller');
var tourneament_controller = require('../controllers/tourneament_controller');
var admin_controller = require('../controllers/admin_controller');
var {auth} = require('../middleware/auth')

/** PLAYER ROUTES */

//POST for new player
router.post('/player/addPlayer',player_controller.add_player);

// //GET all players
router.get('/player/players',player_controller.players);

//DELETE for specific user
router.delete('/player/deletePlayer/:id',player_controller.delete_player);

// //GET for fetching an specific player
router.get('/player/getPlayer/:id',player_controller.get_player);

//PATCH for updateing player personal info
router.patch('/player/updatePlayer/:id',player_controller.update_personal_info);

/**SPORT ROUTES */

//POST for new sport
router.post('/sport/addSport', sport_controller.add_sport);

//GET for sports
router.get('/sport/sports',sport_controller.sports);

//DELETE for removing specific sport
router.delete('/sport/deleteSport/:id',sport_controller.delete_sport);

// //PATCH for updating specific sport
router.patch('/sport/updateSport/:id',sport_controller.update_sport);

//Get fot getting a specific sport
router.get('/sport/getSport/:id',sport_controller.get_sport);

/**TEAM ROUTES */

//POST for new team
router.post('/team/addTeam', team_controller.add_team);

// GET for teams
router.get('/team/teams',team_controller.teams);

// //DELETE for removing specific team
router.delete('/team/deleteTeam/:id',team_controller.delete_team);

// // //PATCH for updating specific team
router.patch('/team/updateTeam/:id',team_controller.update_team);

//Get fot getting a specific team
router.get('/team/getTeam/:id',team_controller.get_team);

/**TOURNEAMENT ROUTES */

//POST for new team
router.post('/tourneament/add', tourneament_controller.add);

//DELETE for deletin all teams
router.delete('/tourneament/deleteAll',tourneament_controller.deleteAll);

// GET for teams takinf part of the current Tourneament
router.get('/tourneament/teamsInTourneament/:id',tourneament_controller.teamsInTourneament);

//DELETE for removing specific team
router.delete('/tourneament/delete/:id',tourneament_controller.delete_tourneament);

//PATCH for updating specific team
router.patch('/tourneament/update/:id',tourneament_controller.update_tourneament);


//Get fot getting a specific team
router.get('/tourneament/all',tourneament_controller.tourneaments);

//Get fot getting a specific team
router.get('/tourneament/get/:id',tourneament_controller.get_tourneament);

/**ADMIN ROUTES */

//POST for logining admin
router.post('/admin/signUp',admin_controller.signUp);

//GET for logining admin
router.get('/admin/login',admin_controller.login);

//GET for getting admin data
router.get('/admin/me',auth,admin_controller.me);

//POST for logging out admin 
router.get('/admin/logout',auth,admin_controller.logout);

//POST for updating admin 
router.patch('/admin/update',auth,admin_controller.update);




module.exports = router;