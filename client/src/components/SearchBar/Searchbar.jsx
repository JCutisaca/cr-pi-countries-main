import { useEffect, useState } from "react";
import style from './Searchbar.module.css'
import { useDispatch } from "react-redux";
import { getCountriesByName } from "../Redux/actions";
import { NavLink } from "react-router-dom";


const Searchbar = () => {

    const [countryName, setCountryName] = useState('');

    const handleChange = (event) => {
        setCountryName(event.target.value)
    }
    const dispatch = useDispatch()
    const handleSearch = () => {
        dispatch(getCountriesByName(countryName));
        setCountryName('');
    }
    return (
        <div className={style.container}>
            <input placeholder="  Search Country" className={style.buttonInput} type="search" onChange={handleChange} value={countryName} />
            <NavLink to={"/home"}>
                <button className={style.button} onClick={handleSearch}>Buscar</button>
            </NavLink>
        </div>
    )
}

export default Searchbar;