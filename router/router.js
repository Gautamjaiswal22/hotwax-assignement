const router = require("express").Router();
const controller = require('../controllers/controller')
router.get("/welcome", controller.welcome);
router.post('/insertPerson', controller.insertPerson);
router.put('/updatePerson', controller.updatePerson);
router.get('/getPerson/:partyId?', controller.getPerson);
module.exports = router;