const { Country, Activity } = require('../db');
const { Op } = require('sequelize')

const getCountryByName = async (name) => {
    if (!name) throw Error("Please provide a 'name' parameter in your query.")
    const getCountries = await Country.findAll({
        where: {
            name: {
                [Op.iLike]: `${name}%`
            }
        }, include: Activity
    })
    if (!getCountries.length) throw Error("No countries were found with the specified name.")
    return getCountries;
}

module.exports = getCountryByName