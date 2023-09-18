import { useDispatch, useSelector } from 'react-redux';
import style from './Form.module.css'
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import { validationDateStart, validationDifficulty, validationName } from './FormValidation';
import { postAcivity } from '../Redux/actions';
import countriesBackground from '../Images/formActivities.jpg'
import image2 from '../Images/2.jpg'
import image3 from '../Images/3.jpg'
import image4 from '../Images/4.jpg'
import deleteIcon from '../Images/deleteIcon.svg'
import MenuBurger from '../MenuBurger/MenuBurger';

const Form = ({ menuBurger, handleMenu, handleMenuFalse }) => {

    const dispatch = useDispatch()
    const [form, setForm] = useState({
        name: "",
        dificultad: "",
        duracion: "",
        temporada: [],
        CountriesId: []
    })
    const [selectedCountries, setSelectedCountries] = useState([])
    const [errors, setErrors] = useState({})

    const countries = useSelector(state => state.countriesCopy)

    const handleInputName = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const handleSelectDifficult = (event) => {
        setForm({
            ...form,
            dificultad: event.target.value
        })
    }


    const handleChangeDate = (event) => {
        setForm({
            ...form,
            duracion: event.target.value
        })
    }

    const handleSeasons = (event) => {
        if (event.target.checked) {
            setForm({
                ...form,
                temporada: [...form.temporada, event.target.value]
            })
        } else {
            setForm({
                ...form,
                temporada: form.temporada.filter(season => season !== event.target.value)
            })
            const { temporada, ...newErrors } = errors
            setErrors({ ...newErrors })
        }
    }

    const handleBlurSeason = (event) => {
        if (!event.target.checked && !form.temporada[0]) {
            setErrors({
                ...errors,
                temporada: "Please select at least one season."
            })
            return;
        } else {
            const { temporada, ...newErrors } = errors
            setErrors({ ...newErrors })
        }
    }


    const handleSelectCountries = (event) => {
        const existsCountry = selectedCountries.find(country => country.id === event.target.value)
        if (existsCountry) {
            return window.alert("Country already selected")
        }
        setForm({
            ...form,
            CountriesId: [...form.CountriesId, event.target.value]
        })
        const { id, name, flag } = countries.find(country => country.id === event.target.value)
        setSelectedCountries([...selectedCountries, { id, name, flag }])
    }

    const handleDeleteCountry = (id) => {
        const newCountries = selectedCountries.filter(country => country.id !== id)
        const newCountriesId = newCountries.map(country => {
            return country.id
        })
        setSelectedCountries(newCountries)
        setForm({
            ...form,
            CountriesId: newCountriesId
        })
    }

    const handleBlurName = () => {
        validationName(form, errors, setErrors);
    }

    const seasons = ["Spring", "Summer", "Fall", "Winter"]

    const handleBlurDifficulty = () => {
        validationDifficulty(form, errors, setErrors)
    }

    const handleBlurDateStart = () => {
        validationDateStart(form, errors, setErrors)
    }

    const handleBlurSelectedCountries = () => {
        if (!selectedCountries.length) {
            setErrors({
                ...errors,
                CountriesIds: "At least one country selection is required, with a maximum of 9 countries."
            })
            return;
        } else {
            const { CountriesIds, ...newErrors } = errors
            setErrors({ ...newErrors })
        }
    }

    const [selectedDifficulty, setSelectedDifficulty] = useState("default");

    const navigate = useNavigate()
    const handlePostActivity = (event) => {
        event.preventDefault()
        dispatch(postAcivity(form))
        setForm({
            name: "",
            dificultad: "",
            duracion: "",
            temporada: [],
            CountriesId: []
        })
        setSelectedCountries([])
        // window.location.reload();
        window.alert("Se creo la actividad")
        navigate("/home")
    }

    const [backgroundImageIndex, setBackgroundImageIndex] = useState(0);
    const backgroundImages = [countriesBackground, image2, image3, image4];

    useEffect(() => {
        const changeBackgroundImage = () => {
            setBackgroundImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length)
        }
        const intervalId = setInterval(changeBackgroundImage, 5000);
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const validateSubmit = () => {
        if (!form.name.length) return false
        if (!form.dificultad.length) return false
        if (!form.duracion.length) return false
        if (!form.temporada.length) return false
        if (!form.CountriesId.length) return false
        return true
    }

    return (
        <div className={style.container}
            style={{
                backgroundSize: 'cover',
                backgroundImage: `url(${backgroundImages[backgroundImageIndex]})`,
            }}>
            {!menuBurger ? <div className={style.leftSection}>
                <form onSubmit={handlePostActivity} className={style.form} action="">
                    <h1>Create Activity</h1>
                    <label htmlFor="">Name:</label>
                    <input maxLength="21" placeholder='Enter activity name...' onBlur={handleBlurName} name='name' onChange={handleInputName} value={form.name} type="text" />
                    {errors.name ? <p className={style.errorMessage}>{errors.name}</p> : <p>&nbsp;</p>}
                    <label htmlFor="">Difficulty:</label>
                    <select onBlur={handleBlurDifficulty} onChange={handleSelectDifficult} placeholder="Select Difficulty" name="" id="">
                        <option className={style.optionCountry} name="dificultad" value="0">-Select an option-</option>
                        <option className={style.optionCountry} name="dificultad" value="1">Very Easy</option>
                        <option className={style.optionCountry} name="dificultad" value="2">Easy</option>
                        <option className={style.optionCountry} name="dificultad" value="3">Moderate</option>
                        <option className={style.optionCountry} name="dificultad" value="4">Difficult</option>
                        <option className={style.optionCountry} name="dificultad" value="5">Very Difficult</option>
                    </select>
                    {errors.dificultad ? <p className={style.errorMessage}>{errors.dificultad}</p> : <p>&nbsp;</p>}
                    <label htmlFor="">Duration:</label>
                    <input
                        onBlur={handleBlurDateStart}
                        type="number"
                        name='duracion'
                        value={form.duracion}
                        onChange={handleChangeDate}
                        placeholder="Enter duration in hours..."
                    />
                    {errors.dateStart ? <p className={style.errorMessage}>{errors.dateStart}</p> : <p>&nbsp;</p>}
                    <label htmlFor="">Season:</label>
                    <div className={style.season}>
                        <input onBlur={handleBlurSeason} onChange={handleSeasons} name='temporada' type="checkbox" value='Spring' />
                        <p>Spring</p>
                        <input onBlur={handleBlurSeason} onChange={handleSeasons} name='temporada' type="checkbox" value='Summer' />
                        <p>Summer</p>
                        <input onBlur={handleBlurSeason} onChange={handleSeasons} name='temporada' type="checkbox" value='Fall' />
                        <p>Fall</p>
                        <input onBlur={handleBlurSeason} onChange={handleSeasons} name='temporada' type="checkbox" value='Winter' />
                        <p>Winter</p>
                    </div>
                    {errors.temporada ? <p className={style.errorMessage}>{errors.temporada}</p> : <p>&nbsp;</p>}
                    <label htmlFor="">Countries:</label>
                    <select disabled={selectedCountries.length >= 9} onBlur={handleBlurSelectedCountries} onChange={handleSelectCountries}>
                        <option className={style.optionCountry} value="">-Select an option-</option>
                        {countries?.map(country => {
                            return (
                                <option className={style.optionCountry} key={country.id} name='CountriesId' value={country.id}>{country.name}</option>
                            )
                        })}
                    </select>
                    {errors.CountriesIds ? <p className={style.errorMessage}>{errors.CountriesIds}</p> : <p>&nbsp;</p>}
                    <button disabled={!validateSubmit()} className={style.submit} type='submit'>Create Activity</button>
                </form>
            </div> : null}
            {!menuBurger ? <div className={style.rightSection}>
                {selectedCountries?.map(({ id, name, flag }) => {
                    return (
                        <div key={id} className={style.card}>
                            <button className={style.close}><img onClick={() => handleDeleteCountry(id)} className={style.closeImg} src={deleteIcon} title='delete' /></button>
                            <NavLink className={style.container} to={`/country/${id}`}>
                                <img className={style.image} src={flag} alt="" />
                                <h2 className={style.name}>{name}</h2>
                            </NavLink>
                        </div>
                    )
                })}
            </div> : null}
            {menuBurger ? <MenuBurger handleMenuFalse={handleMenuFalse} handleMenu={handleMenu} /> : null}
        </div>
    )
}

export default Form;