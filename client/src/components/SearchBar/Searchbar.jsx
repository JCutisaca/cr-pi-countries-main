import { useEffect, useState } from "react";
import style from './Searchbar.module.css'
import { useDispatch } from "react-redux";
import { getCountriesByName } from "../Redux/actions";


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
        <div>
            <input className={style.buttonInput} type="search" onChange={handleChange} value={countryName} />
            <button className={style.button} onClick={handleSearch}>Buscar</button>
        </div>
    )
}

export default Searchbar;