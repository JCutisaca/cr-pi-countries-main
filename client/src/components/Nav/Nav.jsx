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
                <button onClick={allCountries} className={style.button}>Home</button>
            </NavLink>
            <Searchbar onSearch={onSearch} />
            <NavLink to={"/form"}>
                <button className={style.buttons}>Add Activity</button>
            </NavLink>
            <NavLink>
                <button className={style.buttons}>Contact</button>
            </NavLink>
        </nav>
    )
}

export default Nav;