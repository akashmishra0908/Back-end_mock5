const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { createAppointment, getAppointments} = require('../controller/appointment');
const {register,login}=require("../controller/userController")

const router = express.Router();

router.post("/signup", register);
router.post("/login", login);
router.post("/appointments", authMiddleware, createAppointment);
router.get("/appointments", getAppointments);

module.exports = router;