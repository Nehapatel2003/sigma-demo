const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controller/users.js");

router.route("/signup")
 .get(userController.renderSignUpForm)
 .post(wrapAsync(userController.signUp))

router.route("/login") 
 .get(userController.renderLogInForm)
 .post(saveRedirectUrl ,passport.authenticate("local",{failureRedirect:"/login", failureFlash:true}), userController.logIn)

// router.get("/signup",userController.renderSignUpForm)

// router.post("/signup",wrapAsync(userController.signUp));

// router.get("/login",userController.renderLogInForm);

// router.post("/login", saveRedirectUrl ,passport.authenticate("local",{
//     failureRedirect:"/login",
//     failureFlash:true}), userController.logIn);

router.get("/logout",userController.logOut);

module.exports = router; 