import Searchbar from '../SearchBar/Searchbar';
import style from './Nav.module.css'
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllCountries } from '../Redux/actions';

const Nav = ({ onSearch }) => {
    const dispatch = useDispatch()
    const allCountries = () => {
        return dispatch(getAllCountries())
    }
    return (
        <nav className={style.nav}>
            <NavLink to={('/home')}>
                <button onClick={allCountries} className={style.button}>All Countries</button>
            </NavLink>
            <Searchbar onSearch={onSearch} />
            <div className={style.containerButton}>
                <NavLink to={"/form"}>
                    <button className={style.buttons}>Add Activity</button>
                </NavLink>
                <NavLink to={"/activities"}>
                    <button className={style.buttons}>Activities</button>
                </NavLink>
            </div>
        </nav>
    )
}

export default Nav;