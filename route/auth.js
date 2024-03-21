const express = require('express');
const router = express.Router();
const { signup, login } = require('../controller/auth');
// const { checkAuthentication } = require("../middleware/auth")

// router.get("")
// router.get( fetchUser)
router.post("/signup", signup)
router.post("/login", login)
// router.put( "",updateUser)
// router.delete( "",deleteUser)
// router.post(":_id", UpdateUser)
// router.post("_id", DeleteUser)

module.exports = router