const axios = require("axios");
const { Country, Activity } = require("../db");


const getCountryById = async (req, res) => {
    try {
        const { idPais } = req.params;
        const findCountry = await Country.findOne({
            where: {
                id: idPais
            },
            include: {
                model: Activity,
                attributes: ['name', 'dificultad', 'duracion', 'temporada']
            }
        })
        res.status(200).json(findCountry)
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = getCountryById;