import style from './Landing.module.css'
import { NavLink } from 'react-router-dom';

const Landing = () => {
    return (
        <div className={style.container}>
            <NavLink className={style.button} to={"/home"}>Home</NavLink>
        </div>
    )
}

export default Landing;