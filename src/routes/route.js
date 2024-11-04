const { Router } = require("express");
const { getCourses } = require("../controllers/courseController");
const router = Router();

router.get("/courses", getCourses);

module.exports = router;
