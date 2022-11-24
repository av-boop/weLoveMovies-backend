const router = require("express").Router();
const controller = require("./movies.controller");
const theaterRouter = require("../theaters/theaters.router");
const reviewRouter = require("../reviews/reviews.router");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.use("/:movieId/reviews", controller.movieExists, reviewRouter);
router.use("/:movieId/theaters", controller.movieExists, theaterRouter);
router.route("/:movieId").get(controller.read).all(methodNotAllowed);
router.route("/").get(controller.list).all(methodNotAllowed);

module.exports = router;
