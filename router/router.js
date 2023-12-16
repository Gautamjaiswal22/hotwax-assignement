const router = require("express").Router();
const controller = require('../controllers/controller')
router.get("/welcome", controller.welcome);
router.post('/insertPerson', controller.insertPerson);
module.exports = router;