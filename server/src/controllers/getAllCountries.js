const { Country } = require('../db')

const getAllCountries = async (req, res) => {
    try {
        const countries = await Country.findAll()
        return res.status(200).json(countries)
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = getAllCountries;