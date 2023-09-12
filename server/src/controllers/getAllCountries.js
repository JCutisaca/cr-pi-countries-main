const { Country, Activity } = require('../db')

const getAllCountries = async () => {
        const countries = await Country.findAll({
                include: Activity
            })
        if (!countries.length) throw Error("No countries found in the database.")
        return countries;
}

module.exports = getAllCountries;