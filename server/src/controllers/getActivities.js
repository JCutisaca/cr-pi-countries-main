const { Activity, Country } = require('../db');

const getActivities = async (req, res) => {
    try {
        const newActivities = await Activity.findAll({
            include: Country
        })
        res.status(200).json(newActivities)
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = getActivities