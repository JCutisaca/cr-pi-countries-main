import style from './MenuBurger.module.css'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllCountries, getCountriesByName } from '../Redux/actions';
import searchIcon from '../Images/searchIcon.svg'

const MenuBurger = ({ menuBurger, handleMenu, handleMenuFalse }) => {

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
        handleMenuFalse()
    }
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            dispatch(getCountriesByName(countryName));
            setCountryName('');
            handleMenuFalse()
            if(location !== "/home") {
                navigate("/home")
            }
        }
      };
    return (
        <div className={style.menuBurger}>
            <div className={style.buttons}>
                <NavLink to={"/home"} onClick={() => {
                    dispatch(getAllCountries()),
                    handleMenu()
                    return
                }} className={style.tags}><h3>Home</h3></NavLink>
                <div className={style.containerSearch}>
                <input onKeyPress={handleKeyPress} className={style.input} placeholder='Search Country..' type="search" onChange={handleChange} value={countryName}/>
                <button onClick={() => {
                    handleSearch(),
                    handleMenuFalse(),
                    navigate("/home")
                    return
                }} className={style.inputSearch}><img src={searchIcon} className={style.image} /></button>
                </div>
                <NavLink onClick={handleMenu} to={"/form"} className={style.tags}><h3>Add Activity</h3></NavLink>
                <NavLink onClick={handleMenu} className={style.tags} to={"/about"}><h3>About</h3></NavLink>
            </div>
        </div>
    )
}

export default MenuBurger;