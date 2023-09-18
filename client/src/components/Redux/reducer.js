const initialState = {
    allCountries: [],
    countriesCopy: [],
    countryDetail: [],
    activities: [],
    activityOfCountry: []
}

export let filterContinent = "";
export let filterActivities = "";
export let order = "";
let onSearch = false

const reducer = (state = initialState, { type, payload }) => {
    const newCopyCountries = !onSearch ? [...state.countriesCopy] : onSearch
    switch (type) {
        case 'GET_ALL_COUNTRIES':
            order = ""
            onSearch = false
            filterContinent = ""
            filterActivities = ""
            return {
                ...state,
                allCountries: payload.sort((a, b) => a.name.localeCompare(b.name)),
                countriesCopy: payload.sort((a, b) => a.name.localeCompare(b.name))
            };
        case 'GET_COUNTRIES_BY_NAME':
            onSearch = payload;
            return {
                ...state,
                allCountries: payload
            }
        case 'GET_COUNTRY_DETAIL':
            return {
                ...state,
                countryDetail: payload,
                activityOfCountry: payload.Activities
            }
        case 'CLEAN_DETAIL':
            return {
                ...state,
                countryDetail: []
            }
        case 'GET_ALL_ACTIVITIES':
            return {
                ...state,
                activities: payload
            }
        case 'POST_ACTIVITY':
            return {
                ...state,
                activities: [...state.activities, payload]
            }
        case 'DELETE_ACTIVITY':
            return {
                ...state,
                activities: state.activities.filter(activity => activity.id !== payload),
                countryDetail: {
                    ...state.countryDetail,
                    Activities: state.countryDetail.Activities.filter(activity => activity.Countries_Activities.ActivityId !== payload)
                },
                activityOfCountry: state.activityOfCountry.filter(activity => activity.Countries_Activities.ActivityId !== payload)
            }
        case 'UPDATE_ACTIVITY':
            return {
                ...state,
                activityOfCountry: state.activityOfCountry.map((activity) => {
                    if (activity.Countries_Activities.ActivityId === payload.id) {
                        return {
                            ...payload,
                            Countries_Activities: activity.Countries_Activities
                        }
                    }
                    return activity
                })
            }
        case 'ORDER':
            const copyAllCountries = [...state.allCountries]
            order = payload;
            return {
                ...state,
                allCountries:
                    payload === 'A' ?
                        copyAllCountries.sort((a, b) => a.name.localeCompare(b.name))
                        : payload === 'D'
                            ? copyAllCountries.sort((a, b) => b.name.localeCompare(a.name))
                            : payload === 'AP'
                                ? copyAllCountries.sort((a, b) => b.population - a.population)
                                : copyAllCountries.sort((a, b) => a.population - b.population)
            }
        case 'FILTER':
            if (payload === 'All Countries') {
                filterContinent = "";
                return {
                    ...state,
                    allCountries: filterActivities.length ? newCopyCountries.filter(country => {
                        return country.Activities.some(activity => activity.id === +filterActivities)
                    }) : newCopyCountries
                }
            }
            filterContinent = payload;
            return {
                ...state,
                allCountries: filterActivities.length ? newCopyCountries.filter(country => {
                    return (country.continents[0] === payload && country.Activities.some(activity => activity.id === +filterActivities))
                }) : newCopyCountries.filter(country => {
                    return country.continents[0] === payload
                })
            }
        case 'FILTER_ACTIVITY':
            if (payload === 'All Countries') {
                filterActivities = "";
                return {
                    ...state,
                    allCountries: filterContinent ? newCopyCountries.filter(country => {
                        return (country.continents[0] === filterContinent)
                    }) : newCopyCountries
                }
            }
            filterActivities = payload;
            return {
                ...state,
                allCountries: filterContinent.length ? newCopyCountries.filter(country => {
                    return (country.continents[0] === filterContinent && country.Activities.some(activity => activity.id === +payload))
                }) : newCopyCountries.filter(country => {
                    return country.Activities.some(activity => activity.id === +payload)
                })
            }
        default:
            return { ...state }
    }
}

export default reducer;