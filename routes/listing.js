const express = require("express");
const router = express.Router();
const wrapAysnc = require("../utils/wrapAsync");
const {isLoggedIn, isOwner, validateListing} = require("../middleware");
const listingController = require("../controllers/listings");
const multer = require("multer");
const {storage} = require("../cloudConfig");
const Listing = require("../models/listing");
const upload = multer({storage});

//Index Route
router.get("/", wrapAysnc(listingController.index));

//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);


//Show Route
router.get("/:id", wrapAysnc(listingController.showListing));

//Create Route
// router.post("/", isLoggedIn, validateListing, wrapAysnc(listingController.createListing));
router.post("/", isLoggedIn, upload.single("listing[image]"), validateListing, wrapAysnc(listingController.createListing));

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAysnc(listingController.renderEditForm));

//Update Route
router.put("/:id", isLoggedIn, upload.single("listing[image]"), validateListing, wrapAysnc(listingController.updateListing));

//Delete Route
router.delete("/:id", isLoggedIn, isOwner, wrapAysnc(listingController.deleteListing));


module.exports = router;