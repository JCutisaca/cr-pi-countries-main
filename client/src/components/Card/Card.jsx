import style from './Card.module.css'
import { NavLink } from 'react-router-dom'

const Card = ({ id, name, flag, continents, capital, subregion, area, population }) => {
    return (
        <div className={style.card}>
            <NavLink className={style.container} to={`/country/${id}`}>
                <img className={style.image} src={flag} alt="" />
                <h2 className={style.name}>{name}</h2>
                <h2 className={style.id}>{id}</h2>
                <h2 className={style.continents}>{continents}</h2>
            </NavLink>
        </div>
    )
}

export default Card