const { Activity } = require('../db')

const deleteActivity = async (ActivityId) => {
    if (!ActivityId) throw Error("No ID was received.")
    const findActivity = await Activity.findByPk(ActivityId)
    if (!findActivity) throw Error("No activity exists with that ID.")
    const destroyActivity = await Activity.destroy({ where: { id: ActivityId } })
    return "Activity deleted successfully."
}

module.exports = deleteActivity;