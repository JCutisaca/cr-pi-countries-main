const { Country } = require('../db')

const getAllCountries = async () => {
        const countries = await Country.findAll()
        if (!countries.length) throw Error("No countries found in the database.")
        return countries;
}

module.exports = getAllCountries;