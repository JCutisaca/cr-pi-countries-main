import style from './Home.module.css'
import Card from '../Card/Card'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterCountries, getAllActivities, getAllCountries, orderCountries, filterActivity } from '../Redux/actions'
import MenuBurger from '../MenuBurger/MenuBurger'
import FilterResponsive from '../FilterResponsive/FilterResponsive'
import { useLocation } from 'react-router-dom'
import loading from '../Images/loading.gif'

const Home = ({ menuBurger, handleMenu, filtersNav, handleMenuFalse }) => {

    const [currentPage, setCurrentPage] = useState(1)
    const dispatch = useDispatch()

    const allCountries = useSelector(state => state.allCountries);
    const countriesCopy = useSelector(state => state.countriesCopy);
    const activities = useSelector(state => state.activities)

    const itemsPerPage = 10;
    const finalPage = Math.ceil(allCountries.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;

    const visibleCountries = allCountries.slice(startIndex, startIndex + itemsPerPage);

    useEffect(() => {
        if (!countriesCopy.length) {
            dispatch(getAllCountries())
            dispatch(getAllActivities())
            window.scrollTo(0, 0);
        }
    }, [])

    useEffect(() => {
        if (allCountries.length === 250) {
            resetSelects()
        }
        setCurrentPage(1)
        window.scrollTo(0, 0);
    }, [allCountries])

    const handleOrder = (event) => {
        dispatch(orderCountries(event.target.value))
        setOrderValue(event.target.value)
    }
    const handleFilter = (event) => {
        dispatch(filterCountries(event.target.value))
        setFilterValue(event.target.value)
    }
    const handleActivity = (event) => {
        dispatch(filterActivity(event.target.value))
        setActivityValue(event.target.value)
    }

    const location = useLocation().pathname;
    const [defaultSelect, setDefaultSelect] = useState({
        order: "A",
        continent: "All Countries",
        activity: "All Countries"
    })

    const [orderValue, setOrderValue] = useState('A');
    const [filterValue, setFilterValue] = useState('All Countries');
    const [activityValue, setActivityValue] = useState('All Countries');

    const resetSelects = () => {
        setOrderValue('A');
        setFilterValue('All Countries');
        setActivityValue('All Countries');
    };

    return (
        <div className={style.background}>
            <div className={style.home}>
                {!menuBurger ? <div className={style.filterContainer}>
                    <select value={orderValue} className={style.buttonOrder} onChange={handleOrder}>
                        <optgroup className={style.opgOption} label="Name">
                            <option value="A">Ascending</option>
                            <option value="D">Descending</option>
                        </optgroup>
                        <optgroup className={style.opgOption} label='Population'>
                            <option value="AP">Ascending</option>
                            <option value="DP">Descending</option>
                        </optgroup>
                    </select>
                    <select value={filterValue} className={style.buttonFilter} onChange={handleFilter}>
                        <option value="All Countries">All Countries</option>
                        <option value="North America">North America</option>
                        <option value="South America">South America</option>
                        <option value="Africa">Africa</option>
                        <option value="Antarctica">Antarctica</option>
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europe</option>
                        <option value="Oceania">Oceania</option>
                    </select>
                    <select value={activityValue} onChange={handleActivity} className={style.filterActivity}>
                        <option value="All Countries">--Select Activity--</option>
                        {activities?.map(activity => {
                            return (
                                <option key={activity.id} value={activity.id}>{activity.name}</option>
                            )
                        })}
                    </select>
                </div> : null}
                <div className={style.containerMenu}>
                    {menuBurger ? <MenuBurger handleMenuFalse={handleMenuFalse} handleMenu={handleMenu} menuBurger={menuBurger} /> : null}
                </div>
                <div className={style.containerFilterResponsive}>
                    {filtersNav ? <FilterResponsive /> : null}
                </div>
                {!menuBurger ? <div className={style.container}>
                    {!countriesCopy.length ?
                        <div className={style.containerLoading}>
                            <h2 className={style.loadingMessage}>Loading...</h2>
                            <img className={style.loading} src={loading} alt="" />
                        </div>
                        : null}
                    {(!visibleCountries.length && countriesCopy.length) ?
                        <div className={style.containerMessage}>
                            <h2 className={style.message}>Sorry, we couldn't find countries that meet your search filters.</h2>
                        </div>
                        : visibleCountries.map(({ id, name, flag, continents, capital, subregion, area, population }) => {
                            return (
                                <div className={style.card} key={id}>
                                    <Card
                                        key={id}
                                        name={name}
                                        id={id}
                                        flag={flag}
                                        continents={continents}
                                        capital={capital}
                                        subregion={subregion}
                                        area={area}
                                        population={population}
                                    />
                                </div>
                            )
                        })
                    }
                    {visibleCountries.length ? <div className={style.pagination}>
                        <button className={style.button}
                            disabled={currentPage === 1}
                            onClick={() => {
                                window.scrollTo(0, 0);
                                setCurrentPage(1)
                            }}>Start</button>
                        <button className={style.button}
                            onClick={() => {
                                window.scrollTo(0, 0);
                                setCurrentPage(currentPage - 1)
                            }}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <span className={style.page}>Page {currentPage} of {finalPage}</span>
                        <button className={style.button}
                            onClick={() => {
                                window.scrollTo(0, 0);
                                setCurrentPage(currentPage + 1)
                            }}
                            disabled={currentPage === finalPage}
                        >
                            Next
                        </button>
                        <button className={style.button}
                            onClick={() => {
                                window.scrollTo(0, 0);
                                setCurrentPage(finalPage)
                            }
                            }
                            disabled={currentPage === finalPage}
                        >End</button>
                    </div> : null}
                </div> : null}
            </div>
        </div>
    )
}

export default Home;