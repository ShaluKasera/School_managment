const express = require("express")
const router = express.Router();
const {createSchool,getAllSchools} = require('../controllers/school');
const authenticateUser = require('../middleware/auth')
router.post('/addSchool',authenticateUser, createSchool);
router.post('/listSchools',authenticateUser, getAllSchools);

module.exports = router;