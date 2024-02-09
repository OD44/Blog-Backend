const express = require('express')
const {SignUp, SignIn, updatePassword, Logout, forgetPassword} = require('../Controller/Auth')
const { CreatePost } = require('../Controller/Blog')

const router = express.Router()

router.route('/').post(SignUp)
router.route("/sign-in").post(SignIn)
router.route("/reset").post(forgetPassword)
router.route("/reset:token").post(updatePassword)
router.route("/logout").get(Logout)
router.route("/create-post").post(CreatePost)


module.exports = router