const getDataApi = require("./getDataApi")
const { Country } = require('../db')

const postDataToDB = async () => {
    try {
        const data = await Country.findAll()
        if(data.length) {
            return data;
        }
        const countries = await getDataApi();
        const createCountries = await Country.bulkCreate(countries);
        return createCountries;
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = postDataToDB;