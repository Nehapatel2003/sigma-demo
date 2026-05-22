const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isowner,validateListing} = require("../middleware.js");
const listingController = require("../controller/listing.js")
const { listingSchema } = require("../schema.js");
const multer  = require('multer')
const{storage} = require("../cloudconfig.js")
const upload = multer({storage })

router.route("/")
 .get( wrapAsync(listingController.index))
 .post(isLoggedIn , upload.single('listing[image]'), validateListing ,wrapAsync(listingController.createListing));

 // New and Create Route
router.get("/new", isLoggedIn ,listingController.renderNewForm);

router.route("/:id")
 .get(wrapAsync(listingController.showListing))
 .put(isLoggedIn ,isowner, upload.single('listing[image]'), validateListing ,wrapAsync( listingController.updateListing))
 .delete(isLoggedIn,  isowner ,wrapAsync(listingController.destroyListing))

// // Index Route 
// router.get("/", wrapAsync(listingController.index));

// // New and Create Route
// router.get("/new", isLoggedIn ,listingController.renderNewForm);

// router.post("/" , isLoggedIn ,validateListing, wrapAsync(listingController.createListing));
    


// Show Route
// router.get("/:id", wrapAsync(listingController.showListing));


// Edit and Update Route
router.get("/:id/edit", isLoggedIn, isowner ,wrapAsync(listingController.renderEditForm));
// router.put("/:id", isLoggedIn ,isowner,validateListing ,wrapAsync( listingController.updateListing));

// Delete Route
// router.delete("/:id", isLoggedIn,  isowner ,wrapAsync(listingController.destroyListing));

module.exports =  router;