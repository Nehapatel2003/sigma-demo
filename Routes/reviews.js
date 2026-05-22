const express = require("express");
const router = express.Router({ mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js")
const { listingSchema,reviewSchema} = require("../schema.js")
const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js");
const {validateReviews, isLoggedIn, isReviewAuthor} = require("../middleware.js")
const reviewsController = require("../controller/reviews.js");


// Post Reviews Route 
router.post("/", isLoggedIn ,validateReviews ,wrapAsync (reviewsController.createReview));

// Delete Reviews Route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewsController.destroyReview));

module.exports = router;
