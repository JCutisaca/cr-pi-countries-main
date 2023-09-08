const { Router } = require("express");
const { getActivitiesHandler, postActivitiesHandler, updateActivityHandler, deleteActivityHandler, getActivityByIdHandler } = require("../handlers/activitiesHandler");
const activitiesRouter = Router()

activitiesRouter.get("/", getActivitiesHandler)
activitiesRouter.post("/", postActivitiesHandler)
activitiesRouter.put("/", updateActivityHandler)
activitiesRouter.get("/:id", getActivityByIdHandler)
activitiesRouter.delete("/:ActivityId", deleteActivityHandler)

module.exports = activitiesRouter