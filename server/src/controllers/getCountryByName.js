const { Country } = require('../db');
const { Op } = require('sequelize')

const getCountryByName = async (req, res) => {
    try {
        console.log(req.query);
        const { name } = req.query;
        if (!name) {
            res.status(404).send("falta el valor la query mi shei")
        }
        let newName = name;
        const getCountry = await Country.findAll({
            where: {
                name: {
                    [Op.iLike]: `${name}%`
                }
            }
        })
        return res.status(200).json(getCountry)
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = getCountryByName