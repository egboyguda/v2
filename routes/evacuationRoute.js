const express = require("express");
const router = express.Router();
const postController = require("../controllers/evacuationController");
const auth = require("../middleware/auth")();

router.route("/mypost").get(auth.authenticate(), postController.get_post);

router
  .route("/")
  .get(postController.getEvacuation)
  .post(auth.authenticate(), postController.addEvacuation)
  .delete(auth.authenticate(), postController.deleteEvacuation);
module.exports = router;
