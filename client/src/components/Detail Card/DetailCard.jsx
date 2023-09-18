import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCountryDetail, cleanDetailCountry } from "../Redux/actions";
import style from './DetailCard.module.css'
import CardActivity from "../CardActivity/CardActivity";
import MenuBurger from "../MenuBurger/MenuBurger";
import loading from '../Images/loading.gif'

const DetailCard = ({ menuBurger, handleMenu, handleMenuFalse }) => {

    const { id } = useParams()
    const dispatch = useDispatch();

    const country = useSelector(state => state.countryDetail)
    const activityOfCountry = useSelector(state => state.activityOfCountry)


    useEffect(() => {
        dispatch(getCountryDetail(id))
        return () => dispatch(cleanDetailCountry())
    }, [])

    useEffect(() => {

    }, [activityOfCountry])

    return (
        <div className={style.background}>
            {!menuBurger ? <div className={style.container}>
                {!country.name ? <div className={style.containerLoading}>
                    <h2 className={style.loadingMessage}>Loading...</h2>
                    <img className={style.loading} src={loading} alt="" />
                </div> : null}
                {country.name ? <div className={style.detail}>
                    <div className={style.detailFixed}>
                        <img className={style.image} src={country.flag} alt={country.flag} />
                        <h3>{country.id}</h3>
                        <h2>{country.name}</h2>
                        <h3>Continent: {country.continents}</h3>
                        {country.capital == 'undefined' ? null : <h3>Capital: {country.capital}</h3>}
                        {country.subregion === 'undefined' ? null : <h3>Subregion: {country.subregion}</h3>}
                        <h3>Area: {country.area} m2</h3>
                        <h3>Population: {country.population}</h3>
                    </div>
                </div> : null}
                <div className={style.activities}>
                    {activityOfCountry?.map((countryActivity) => {
                        return (
                            <div key={countryActivity.Countries_Activities.ActivityId}
                                id={countryActivity.Countries_Activities.ActivityId} className={style.cardActivity}>
                                <CardActivity
                                    name={countryActivity.name}
                                    dificultad={countryActivity.dificultad}
                                    duracion={countryActivity.duracion}
                                    temporada={countryActivity.temporada}
                                    id={countryActivity.Countries_Activities.ActivityId}
                                ></CardActivity>
                            </div>
                        )
                    })
                    }
                </div>
            </div> : <MenuBurger handleMenuFalse={handleMenuFalse} menuBurger={menuBurger} handleMenu={handleMenu} />}
        </div>
    )
}

export default DetailCard;