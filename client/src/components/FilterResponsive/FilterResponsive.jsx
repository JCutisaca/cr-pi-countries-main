import style from './FilterResponsive.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { filterCountries, orderCountries, filterActivity } from '../Redux/actions'
import { order, filterContinent, filterActivities } from '../Redux/reducer'
import { useState, useEffect } from 'react'


const FilterResponsive = () => {

    const activities = useSelector(state => state.activities)

    const dispatch = useDispatch()

    const handleOrder = (event) => {
        dispatch(orderCountries(event.target.value))
        setOrderValue(event.target.value)
    }
    const handleFilter = (event) => {
        dispatch(filterCountries(event.target.value))
        setFilterValue(event.target.value)
    }
    const handleActivity = (event) => {
        const findActivity = activities.find(activity => activity.id === +event.target.value)
        dispatch(filterActivity(event.target.value))
        if (event.target.value === "All Countries") {
            setActivityValue("All Countries")
            return;
        }
        setActivityValue(findActivity.id)
    }

    const [orderValue, setOrderValue] = useState('A');
    const [filterValue, setFilterValue] = useState('All Countries');
    const [activityValue, setActivityValue] = useState('All Countries');

    useEffect(() => {
        if (order.length) {
            setOrderValue(order)
        }
        if (filterContinent.length) {
            setFilterValue(filterContinent)
        }
        if (filterActivities.length) {
            const findActivity = activities.find(activity => activity.id === +filterActivities);
            setActivityValue(findActivity.id)
        }
    }, []);

    return (
        <div className={style.filterContainer}>
            <div className={style.containerSelectors}>
                <h2>Filters</h2>
                <label className={style.options}>Order by:</label>
                <select value={orderValue} onChange={handleOrder} className={style.options}>
                    <optgroup label="Name">
                        <option value="A">Ascending</option>
                        <option value="D">Descending</option>
                    </optgroup>
                    <optgroup label='Population'>
                        <option value="AP">Ascending</option>
                        <option value="DP">Descending</option>
                    </optgroup>
                </select>
                <label className={style.options}>Filter by Continent:</label>
                <select value={filterValue} onChange={handleFilter} className={style.options}>
                    <option value="All Countries">All Countries</option>
                    <option value="North America">North America</option>
                    <option value="South America">South America</option>
                    <option value="Africa">Africa</option>
                    <option value="Antarctica">Antarctica</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                </select>
                <label className={style.options}>Filter by Activity:</label>
                <select value={activityValue} onChange={handleActivity} className={style.options}>
                    <option value="All Countries">Select Activity</option>
                    {activities?.map(activity => {
                        return (
                            <option className={style.options} key={activity.id} value={activity.id}>{activity.name}</option>
                        )
                    })}
                </select>
            </div>
        </div>
    )
}

export default FilterResponsive;