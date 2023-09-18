import Searchbar from '../SearchBar/Searchbar';
import style from './Nav.module.css'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllCountries, filterActivity } from '../Redux/actions';
import filterIcon from '../Images/filterIcon.svg'
import logo from '../Images/logo.png'

const Nav = ({ onSearch, handleMenu, menuBurger, handleFiltersNav, handleFiltersNavFalse, handleMenuFalse }) => {
    const dispatch = useDispatch()
    const allCountries = () => {
        event.preventDefault();
        dispatch(getAllCountries())
        return;
    }
    const navigate = useNavigate()
    const location = useLocation().pathname;

    return (
        <nav className={style.nav}>
            <NavLink className={style.navLink} to={('/home')}>
                <button onClick={allCountries} className={style.button}>All Countries</button>
            </NavLink>
            <Searchbar onSearch={onSearch} />
            <div className={style.containerButton}>
                <NavLink to={"/form"}>
                    <button className={style.buttons}>Add Activity</button>
                </NavLink>
                <NavLink to={"/about"}>
                    <button className={style.buttons}>About</button>
                </NavLink>
            </div>
            <div className={style.responsive}>
                <div onClick={() => {
                    handleMenu(),
                        handleFiltersNavFalse()
                    return
                }} className={`${style.imagesButton} ${menuBurger ? style.open : ''}`}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <button onClick={() => {
                    navigate("/home"),
                        dispatch(getAllCountries())
                    handleMenuFalse()
                    handleFiltersNavFalse()
                }} className={style.buttonResponsive}><img className={style.image} src={logo} /></button>
                {(location === "/home" && !menuBurger) ? <img onClick={handleFiltersNav} className={style.filterImage} src={filterIcon} alt="" /> : <div className={style.filterImageNone}></div>}
            </div>
        </nav>
    )
}

export default Nav;