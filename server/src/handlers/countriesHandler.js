const getAllCountries = require('../controllers/getAllCountries')
const getCountryById = require('../controllers/getCountryById')
const getCountryByName = require('../controllers/getCountryByName')

const getAllCountriesHandler = async (req, res) => {
    try {
        const allCountries = await getAllCountries()
        res.status(200).json(allCountries)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

const getCountriesByNameHandler = async (req, res) => {
    try {
        const { name } = req.query;
        const findedCountries = await getCountryByName(name);
        res.status(200).json(findedCountries)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

const getCountryByIdHandler = async (req, res) => {
    try {
        const { idPais } = req.params;
        const findCountryId = await getCountryById(idPais)
        res.status(200).json(findCountryId)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
module.exports = {
    getAllCountriesHandler,
    getCountriesByNameHandler,
    getCountryByIdHandler
}