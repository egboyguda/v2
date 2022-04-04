const express = require("express");
const router = express.Router();
const evacueesController = require("../controllers/evacueesController");

const auth = require("../middleware/auth")();

router
  .route("/")
  //get evacuees
  .get(evacueesController.getEvacuees)
  .post(auth.authenticate(), evacueesController.addEvacuees);

router.route("/test").get(evacueesController.test);
module.exports = router;
