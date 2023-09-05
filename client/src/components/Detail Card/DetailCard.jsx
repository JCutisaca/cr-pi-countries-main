import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteActivity, getCountryDetail } from "../Redux/actions";
import style from './DetailCard.module.css'
import deleteIcon from '../Images/deleteIcon.svg'
import editIcon from '../Images/editIcon.svg'
import Form from '../Form/Form'

const DetailCard = () => {
    const { id } = useParams()
    const dispatch = useDispatch();
    const country = useSelector(state => state.countryDetail)
    useEffect(() => {
        dispatch(getCountryDetail(id))
    }, [])
    
    const deleteActivityHandler = (ActivityId) => {
        dispatch(deleteActivity(ActivityId))
    }

    const [window, setWindow] = useState(false)
    const handlerWindow = () => {
        setWindow(!window)
    }
    // const updateActivityHandler = (ActivityId) => {

    // }

    return (
        <div className={style.background}>
            {window === true ? <Form></Form> : null}
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
                            <div key={countryActivity.Countries_Activities.ActivityId} id={countryActivity.Countries_Activities.ActivityId} className={style.cardActivity}>
                                <div className={style.containerIcons}>
                                    
                                <img onClick={handlerWindow} className={style.editIcon} src={editIcon}/>
                                <img onClick={() => deleteActivityHandler(countryActivity.Countries_Activities.ActivityId)} className={style.deleteIcon} src={deleteIcon}/>
                                </div>
                                <h2>{countryActivity.name}</h2>
                                <h3>Difficulty: {countryActivity.dificultad}</h3>
                                <h3>{countryActivity.duracion} Hours</h3>
                                {countryActivity.temporada.map(season => {
                                    return (
                                        <h3 key={season}>{season}</h3>
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