import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCountryDetail } from "../Redux/actions";
import style from './DetailCard.module.css'

const DetailCard = () => {
    const { id } = useParams()
    const dispatch = useDispatch();
    const country = useSelector(state => state.countryDetail)
    useEffect(() => {
        dispatch(getCountryDetail(id))
    }, [])

    return (
        <div className={style.background}>
            <div className={style.container}>
                <div className={style.detail}>
                    <div className={style.detailFixed}>
                        <img className={style.image} src={country.flag} alt={country.flag} />
                        <h3>{country.id}</h3>
                        <h2>{country.name}</h2>
                        <h3>Continent: {country.continents}</h3>
                        <h3>Capital: {country.capital}</h3>
                        <h3>Subregion: {country.subregion}</h3>
                        <h3>Area: {country.area} m2</h3>
                        <h3>Population: {country.population}</h3>
                    </div>
                </div>
                <div className={style.activities}>
                    {country?.Activities?.map(countryActivity => {
                        return (
                            <div className={style.cardActivity}>
                                <h2>{countryActivity.name}</h2>
                                <h3>Difficulty: {countryActivity.dificultad}</h3>
                                <h3>Duration: {countryActivity.duracion} Hours</h3>
                                {countryActivity.temporada.map(season => {
                                    return (
                                        <h3>{season}</h3>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default DetailCard;