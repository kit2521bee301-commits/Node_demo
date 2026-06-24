const express =
    require("express");

const {
    registerUser,
    loginUser,
    getProfile,
    getUsers,
    getUserById
    
} = require(
    "../controllers/user.controller.js"
);

const auth =
    require("../middleware/auth");

const router =
    express.Router();

router.post(
    "/register",
    registerUser
);

router.post(
    "/login",
    loginUser
);

router.get(
    "/profile",
    auth,
    getProfile
);

router.get(
    "/",
    getUsers
);

router.get(
    "/:id",
    getUserById
);

module.exports = router;