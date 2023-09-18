import style from './About.module.css'
import gitIcon from '../Images/gitIcon.png'
import emailIcon from '../Images/emailIcon.png'
import linkedIcon from '../Images/linkedIcon.png'
import MenuBurger from '../MenuBurger/MenuBurger'

const About = ({ handleMenuFalse, handleMenu, menuBurger }) => {

    return (
        <div className={style.background}>
            {!menuBurger ? <div className={style.about}>
                <h4 className={style.text}>🌟 Welcome to my world of coding and creativity!</h4>
                <p className={style.text}>👨‍💻 I'm Lucas, a 24-year-old web developer on a mission to craft exceptional digital experiences.</p>
                <p className={style.text}>💻 I'm well-versed in JavaScript, HTML, CSS, React, Redux, Git, Node.js, Express, SQL, and Sequelize. My passion for coding fuels my relentless pursuit of innovative solutions.</p>
                <p className={style.text}>🚀 Beyond coding, I'm an explorer, a ☕ coffee enthusiast, and a lifelong learner. Join me as we embark on a journey of coding excellence!</p>
                <div className={style.containerButton}>
                    <a className={style.button} href="https://github.com/JCutisaca" target='_blank'>
                        <button className={style.button}><img className={style.icon} src={gitIcon} alt="github" /></button>
                    </a>
                    <a className={style.button} href="mailto:lucas.soldierty@gmail.com" target="_blank">
                        <button className={style.button}><img className={style.iconEmail} src={emailIcon} alt="email" /></button>
                    </a>
                    <a className={style.button} href="https://www.linkedin.com/in/jhonathan-cutisaca-b63423229/" target='_blank'>
                        <button className={style.button}><img className={style.iconLinked} src={linkedIcon} alt="email" /></button>
                    </a>
                </div>
            </div> : <MenuBurger handleMenuFalse={handleMenuFalse} handleMenu={handleMenu}></MenuBurger>}
        </div>
    )
}

export default About;