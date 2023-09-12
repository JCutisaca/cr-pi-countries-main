import axios from 'axios'


export const getAllCountries = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios('http://localhost:3001/countries/')
            if (data.length) {
                return dispatch({ type: 'GET_ALL_COUNTRIES', payload: data })
            }
        } catch (error) {
            console.log(error.message);
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

export const cleanDetailCountry = () => {
    return {type: 'CLEAN_DETAIL'}
}

export const getAllActivities = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios('http://localhost:3001/activities/')
            if (data.length) {
                return dispatch({ type: 'GET_ALL_ACTIVITIES', payload: data })
            }
        } catch (error) {
            console.log(error.message);
        }
    }
}

export const postAcivity = (form) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post('http://localhost:3001/activities/', form)
            if (data.name) {
                return dispatch({ type: 'POST_ACTIVITY', payload: data })
            }
        } catch (error) {
            console.log(error.message);
        }
    }
}

export const deleteActivity = (ActivityId) => {
    return async (dispatch) => {
        try {
            const destroyActivity = await axios.delete(`http://localhost:3001/activities/${ActivityId}`)
            return dispatch({ type: 'DELETE_ACTIVITY', payload: ActivityId })
        } catch (error) {
            console.log(error.message);
        }
    }
}

export const updateFormActivity = (updateForm) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.put(`http://localhost:3001/activities/`, updateForm);
            return dispatch({ type: 'UPDATE_ACTIVITY', payload: data });
        } catch (error) {
            console.error(error.message);
        }
    };
};

export const orderCountries = (order) => {
    return { type: 'ORDER', payload: order }
}
export const filterCountries = (continent) => {
    return { type: 'FILTER', payload: continent }
}
export const filterActivity = (id) => {
    return { type: 'FILTER_ACTIVITY', payload: id }
}