const {getAllCourses, getCourse, getSimilarCourses, getAggregatedCourses} = require("../controllers/apiController")
const router = require('express').Router()

router.get("/courses", getAllCourses)
router.get("/courses/:id", getCourse)
router.get("/similar-courses/:id", getSimilarCourses);
router.get("/aggregated-courses/:id", getAggregatedCourses);

module.exports = router;