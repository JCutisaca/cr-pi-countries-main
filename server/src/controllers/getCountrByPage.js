const { Country } = require('../db')

const getcountryByPage = async (req, res) => {
    try {
        const { idPage } = req.params;
        const countriesByPage = 10;
        const offset = (idPage - 1) * countriesByPage;

        const countries = await Country.findAll({
            offset,
            limit: countriesByPage,
            order: [['id', 'ASC']]
        });

        res.status(200).json(countries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los países' });
    }
}

module.exports = getcountryByPage;