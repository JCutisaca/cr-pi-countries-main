const { Activity, Country } = require('../db')

const getActivityById = async (id) => {
    if (!id) throw Error("No se recibio id")
    const findActivity = await Activity.findOne({ where: { id: id }, include: Country })
    return findActivity
}

module.exports = getActivityById