import style from './Home.module.css'
import Card from '../Card/Card'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterCountries, getAllCountries, orderCountries } from '../Redux/actions'

const Home = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const dispatch = useDispatch()
    const allCountries = useSelector(state => state.allCountries);
    const itemsPerPage = 10;
    const finalPage = Math.ceil(allCountries.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const visibleCountries = allCountries.slice(startIndex, startIndex + itemsPerPage);
    useEffect(() => {
        if (!allCountries) {
            dispatch(getAllCountries())
        }
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        setCurrentPage(1)
        window.scrollTo(0, 0);
    }, [allCountries])


    const handleOrder = (event) => {
        dispatch(orderCountries(event.target.value))
    }
    const handleFilter = (event) => {
        dispatch(filterCountries(event.target.value))
    }

    return (
        <div className={style.background}>
            <div className={style.container}>
                <select className={style.buttonOrder} onChange={handleOrder}>
                    <option value="A">Ascending</option>
                    <option value="D">Descending</option>
                    <option value="AP">Ascending Population</option>
                    <option value="DP">Descending Population</option>
                </select>
                <select className={style.buttonFilter} onChange={handleFilter}>
                    <option value="All Countries">All Countries</option>
                    <option value="North America">North America</option>
                    <option value="South America">South America</option>
                    <option value="Africa">Africa</option>
                    <option value="Antarctica">Antarctica</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                </select>
                {visibleCountries.map(({ id, name, flag, continents, capital, subregion, area, population }) => {
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
                <div className={style.pagination}>
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
                    <span className={style.page}>Pagina {currentPage} de {finalPage}</span>
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
                </div>
            </div>
        </div>
    )
}

export default Home;