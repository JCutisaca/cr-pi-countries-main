const deleteActivity = require("../controllers/deleteActivity");
const getActivities = require("../controllers/getActivities");
const getActivityById = require("../controllers/getActivityById");
const postActivities = require("../controllers/postActivities");
const updateActivity = require("../controllers/updateActivity");


const getActivitiesHandler = async (req, res) => {
    try {
        const activities = await getActivities()
        res.status(200).json(activities)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const postActivitiesHandler = async (req, res) => {
    try {
        const { CountriesId, name, dificultad, duracion, temporada } = req.body;
        const postActivity = await postActivities(CountriesId, name, dificultad, duracion, temporada)
        res.status(201).send("Success: The activity has been successfully created.")
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const updateActivityHandler = async (req, res) => {
    try {
        const { Countries, ActivityId, name, dificultad, duracion, temporada } = req.body
        const updateAct = await updateActivity({ Countries, ActivityId, name, dificultad, duracion, temporada })
        res.status(200).json(updateAct)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteActivityHandler = async (req, res) => {
    try {
        const { ActivityId } = req.params
        await deleteActivity(ActivityId)
        res.status(200).send("Se elimino")
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getActivityByIdHandler = async (req, res) => {
    try {
        const { id } = req.params
        const foundActivity = await getActivityById(id)
        res.status(200).json(foundActivity)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getActivitiesHandler,
    postActivitiesHandler,
    updateActivityHandler,
    deleteActivityHandler,
    getActivityByIdHandler
}