const axios = require("axios");
const { Country, Activity } = require("../db");


const getCountryById = async (idPais) => {
    if (!idPais) throw Error("Please provide an 'idPais' (country ID) in your request.")
    const findCountry = await Country.findOne({
        where: {
            id: idPais
        },
        include: {
            model: Activity,
            attributes: ['name', 'dificultad', 'duracion', 'temporada']
        }
    })
    if (!findCountry) throw Error("Invalid or non-existent 'idPais' (country ID). Please provide a valid 'idPais'.")
    return findCountry;
}

module.exports = getCountryById;