import style from './Landing.module.css'
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import landing1 from '../Images/landing1.jpg'
import landing2 from '../Images/landing2.jpg'
import landing3 from '../Images/landing3.jpg'
import landing4 from '../Images/landing4.jpg'

const Landing = () => {

    const [backgroundImageIndex, setBackgroundImageIndex] = useState(0);
    const backgroundImages = [landing1, landing2, landing3, landing4];

    useEffect(() => {
        const changeBackgroundImage = () => {
            setBackgroundImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length)
        }
        const intervalId = setInterval(changeBackgroundImage, 5000);
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <div className={style.container}
            style={{
                backgroundSize: 'cover',
                backgroundImage: `url(${backgroundImages[backgroundImageIndex]})`,
            }}>
            <div className={style.newContainer}>
                <h1>Welcome to our Country Hub!</h1>
                <h2>Explore and create unique experiences in countries around the world.</h2>
                <h2>Discover, plan, and design your own adventures.</h2>
                <h2>The world is your canvas.</h2>
                <NavLink className={style.button} to={"/home"}>Start your dreams today</NavLink>
            </div>
        </div>
    )
}

export default Landing;