const { Country } = require('../db')
const axios = require('axios')
const URL = 'http://localhost:5000/countries/'

const getDataApi = async () => {
    try {
        const { data } = await axios(URL);
        const countries = await data.map(country => {
            return {
                name: country.name.common,
                id: country.cca3,
                flag: country.flags.png,
                continents: country.continents,
                capital: country.capital ? country.capital : ['undefined'],
                subregion: country.subregion ? country.subregion : 'undefined',
                area: country.area,
                population: country.population
            }
        })
        return countries
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = getDataApi;