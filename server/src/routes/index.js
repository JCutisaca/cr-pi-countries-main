const { Router } = require("express");
const getAllCountries = require('../controllers/getAllCountries');
const getCountryById = require("../controllers/getCountryById");
const getCountryByName = require("../controllers/getCountryByName");
const postActivities = require("../controllers/postActivities");
const getActivities = require("../controllers/getActivities");

const router = Router();

router.get("/countries/", getAllCountries)
router.get("/countries/name", getCountryByName)
router.get("/countries/:idPais", getCountryById)

router.get("/activities", getActivities)
router.post("/activities", postActivities)
module.exports = router;
