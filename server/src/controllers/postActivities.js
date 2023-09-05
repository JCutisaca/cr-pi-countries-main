const { Activity, Country } = require('../db');
const getCountryById = require('./getCountryById')

const postActivities = async (CountriesId, name, dificultad, duracion, temporada) => {
  if (!CountriesId || !name || !dificultad || !duracion || !temporada) {
    throw new Error("Incomplete Data: Please provide all required information.")
  }

  let successCount = 0

  for (const countryId of CountriesId) {
    const findCountry = await getCountryById(countryId)
    if (!findCountry) {
      throw new Error(`Country with ID ${countryId} not found.`)
    }
    successCount++;
  }

  if (successCount === CountriesId.length) {
    const createActivitie = await Activity.create({ name, dificultad, duracion, temporada })

    for (const countryId of CountriesId) {
      const findCountry = await getCountryById(countryId)
      await findCountry.addActivity(createActivitie)
    }

    return createActivitie;
  } else {
    throw new Error("Some countries were not linked to the activity.")
  }
}

module.exports = postActivities;
