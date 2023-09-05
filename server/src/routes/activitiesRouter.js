const { Router } = require("express");
const {getActivitiesHandler, postActivitiesHandler, updateActivityHandler, deleteActivityHandler} = require("../handlers/activitiesHandler");
const activitiesRouter = Router()

activitiesRouter.get("/", getActivitiesHandler)
activitiesRouter.post("/", postActivitiesHandler)
activitiesRouter.put("/", updateActivityHandler)
activitiesRouter.delete("/:ActivityId", deleteActivityHandler)

module.exports = activitiesRouter