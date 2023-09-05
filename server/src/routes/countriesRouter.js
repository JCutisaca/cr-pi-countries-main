const { Router } = require("express");
const { getAllCountriesHandler, getCountriesByNameHandler, getCountryByIdHandler } = require("../handlers/countriesHandler");
const countriesRouter = Router()

countriesRouter.get("/", getAllCountriesHandler)
countriesRouter.get("/name", getCountriesByNameHandler)
countriesRouter.get("/:idPais", getCountryByIdHandler)

module.exports = countriesRouter