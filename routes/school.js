const express = require("express")
const router = express.Router();
const {createSchool,getAllSchools} = require('../controllers/school');
const authenticateUser = require('../middleware/auth')
router.post('/addSchool',authenticateUser, createSchool);
router.get('/listSchools',authenticateUser, getAllSchools);

module.exports = router;