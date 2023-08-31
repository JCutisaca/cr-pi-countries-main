const { Activity, Country } = require('../db')

const postActivities = async (req, res) => {
    try {
        const { CountriesId, name, dificultad, duracion, temporada } = req.body;
        if (!CountriesId || !name || !dificultad || !duracion || !temporada) {
            return res.status(400).send("Te faltaron datos rey")
        }

        const createActivitie = await Activity.create({ name, dificultad, duracion, temporada })

        const linkCountry = CountriesId.map(async (countryId) => {
            const findCountry = await Country.findByPk(countryId);
            await findCountry.addActivity(createActivitie)
        })

        if (CountriesId.length === linkCountry.length) {
            return res.status(200).json(createActivitie)
        }
        return res.status(404).send("Error en el post rey")
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Algo falló mi rey");
    }
}

module.exports = postActivities