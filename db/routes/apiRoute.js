const {getAllCourses, getCourse, getSimilarCourses} = require("../controllers/apiController")
const router = require('express').Router()

router.get("/courses", getAllCourses)
router.get("/courses/:id", getCourse)
router.get("/similar-courses/:id", getSimilarCourses);

module.exports = router;