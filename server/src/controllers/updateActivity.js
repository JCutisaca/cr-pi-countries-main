const { Activity, Country } = require('../db')
const getCountryById = require('./getCountryById')

const updateActivity = async ({ Countries, ActivityId, name, dificultad, duracion, temporada }) => {
    if (!ActivityId) throw Error("Missing Data: Please provide at least one ID for the operation.")
    if (!Countries && !name && !dificultad && !duracion && !temporada) throw Error("Incomplete Data: Please provide at least one field to edit.")
    const findActivity = await Activity.findOne({
        where: {
            id: ActivityId
        },
        include: {
            model: Country,
            attributes: ['id', 'name', 'flag', 'continents', "capital", "subregion", "population", "area"]
        }
    })
    if (!findActivity) throw Error("Activity Not Found: The specified activity does not exist.")

    const update = await Activity.update({
        name: name ? name : findActivity.name,
        dificultad: dificultad ? dificultad : findActivity.dificultad,
        duracion: duracion ? duracion : findActivity.duracion,
        temporada: temporada ? temporada : findActivity.temporada,
    },
        { where: { id: ActivityId } }
    )
    // if (Countries.length) {
    //     for (const country of findActivity.Countries) {
    //         const instanceCountry = await getCountryById(country.id)
    //         await instanceCountry.removeActivity(findActivity)
    //     }
    //     for (const country of Countries) {
    //         const instanceCountry = await getCountryById(country)
    //         await instanceCountry.addActivity(findActivity)
    //     }
    // }
    const newActivity = await Activity.findOne({ where: { id: ActivityId } })
    return newActivity;
}

module.exports = updateActivity;

