const express = require("express");
const router = express.Router();
const users = require("../controllers/users");
const passport = require("passport");
// const catchAsync = require('../utils/catchAsync');
router
  .route("/login")
  .get(users.renderLogin)
  .post(
    passport.authenticate("local", { failureRedirect: "/admin/login" }),
    users.postLogin
  );
router.route("/register")
.get(users.renderRegister)
.post(users.postRegister);
router.route('/auth/google')
      .get(passport.authenticate('google',{
        scope: ['profile', 'email']
      }));
router.route('/auth/google/callback')
      .get(passport.authenticate('google', { failureRedirect: 'admin/login' }),users.postLogin)
module.exports = router;
