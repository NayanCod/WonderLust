const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAysnc = require("../utils/wrapAsync");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");

const reviewControllers = require("../controllers/reviews");


//Reviews
// - Post Review Route
router.post("/", validateReview, isLoggedIn, wrapAysnc(reviewControllers.createReview));

// - Delete Review Route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAysnc(reviewControllers.deleteReview));


module.exports = router;