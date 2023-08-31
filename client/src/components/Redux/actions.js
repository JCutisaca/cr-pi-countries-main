import axios from 'axios'


export const getAllCountries = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios('http://localhost:3001/countries/')
            if (data.length) {
                return dispatch({ type: 'GET_ALL_COUNTRIES', payload: data })
            }
        } catch (error) {
            console.log('error en el redux rey');
        }
    }
}

export const getCountriesByName = (countryName) => {
    return async (dispatch) => {
        try {
            const { data } = await axios(`http://localhost:3001/countries/name?name=${countryName}`)
            return dispatch({
                type: 'GET_COUNTRIES_BY_NAME',
                payload: data
            })
        } catch (error) {
            console.log(error.message);
        }
    }
}

export const getCountryDetail = (idPais) => {
    return async (dispatch) => {
        try {
            const { data } = await axios(`http://localhost:3001/countries/${idPais}`)
            if (data.name) {
                return dispatch({ type: 'GET_COUNTRY_DETAIL', payload: data })
            }
        } catch (error) {
            console.log(error.message);
        }
    }
}

export const getAllActivities = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios('http://localhost:3001/activities/')
            if (data.length) {
                return dispatch({ type: 'GET_ALL_ACTIVITIES', payload: data })
            }
        } catch (error) {
            console.log('Error en el redux :ccc');
        }
    }
}

export const postAcivity = (formActivity) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post('http://localhost:3001/activities/', formActivity)
            if (data.name) {
                return dispatch({ type: 'POST_ACTIVITY', payload: data })
            }
        } catch (error) {
            console.log(error.message);
        }
    }
}

export const orderCountries = (order) => {
    return { type: 'ORDER', payload: order }
}
export const filterCountries = (continent) => {
    return { type: 'FILTER', payload: continent }
}