import { useEffect, useState } from "react";
import style from './Searchbar.module.css'
import { useDispatch } from "react-redux";
import { getCountriesByName } from "../Redux/actions";
import { NavLink, useLocation, useNavigate } from "react-router-dom";


const Searchbar = () => {

    const [countryName, setCountryName] = useState('');
    const location = useLocation().pathname;
    const navigate = useNavigate()
    const handleChange = (event) => {
        setCountryName(event.target.value)
    }
    const dispatch = useDispatch()
    const handleSearch = () => {
        dispatch(getCountriesByName(countryName));
        setCountryName('');
    }
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            dispatch(getCountriesByName(countryName));
            setCountryName('');
            if(location !== "/home") {
                navigate("/home")
            }
        }
      };
    return (
        <div className={style.container}>
            <input onKeyPress={handleKeyPress} placeholder="  Search Country" className={style.buttonInput} type="search" onChange={handleChange} value={countryName} />
            <NavLink to={"/home"}>
                <button className={style.button} onClick={handleSearch}>Buscar</button>
            </NavLink>
        </div>
    )
}

export default Searchbar;