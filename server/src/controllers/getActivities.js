const { Activity, Country } = require('../db');

const getActivities = async () => {
    const newActivities = await Activity.findAll({
        include: Country
    })
    if (!newActivities.length) throw Error("No activities were found.")
    return newActivities;
}

module.exports = getActivities