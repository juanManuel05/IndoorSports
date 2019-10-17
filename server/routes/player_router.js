var express = require('express');
var router = express.Router();
var player_controller = require('../controllers/player_controller')

//POST for new player
router.post('/addPlayer',player_controller.add_player);

// //GET all players
router.get('/players',player_controller.players);

//DELETE for specific user
router.delete('/deletePlayer/:id',player_controller.delete_player);

// //GET for fetching an specific player
router.get('/getPlayer/:id',player_controller.get_player);

//PATCH for updateing player personal info
router.patch('/updatePlayer/:id',player_controller.update_personal_info);

module.exports = router;

