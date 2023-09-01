import { useSelector } from 'react-redux';
import style from './Form.module.css'
import { useState } from 'react';
import { NavLink } from 'react-router-dom'

const Form = () => {
    const [form, setForm] = useState({
        name: "",
        dificultad: "",
        duracion: ["", ""],
        temporada: [],
        CountriesId: []
    })
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

    const countries = useSelector(state => state.countriesCopy)

    const handleChangeDate = (event) => {
        setForm({
            ...form,
            duracion: [event.target.value, form.duracion[1]]
        })
    }
    const handleChangeEndDate = (event) => {
        setForm({
            ...form,
            duracion: [form.duracion[0], event.target.value]
        })
    }

    const handleSeasons = (event) => {
        if (!event.target.checked) {
            setForm({
                ...form,
                temporada: [...form.temporada, event.target.value]
            })
            setErrors({
                ...errors,
                temporada: "Please select at least one season."
            })
            return;
        } else {
            setForm({
                ...form,
                temporada: form.temporada.filter(season => season !== event.target.value)
            })
            const {temporada, ...newErrors} = errors
            setErrors({...newErrors})
        }
    }

    const [selectedCountries, setSelectedCountries] = useState([])

    const handleSelectCountries = (event) => {
        setForm({
            ...form,
            CountriesId: [...form.CountriesId, event.target.value]
        })
        const { id, name, flag } = countries.find(country => country.id === event.target.value)
        setSelectedCountries([...selectedCountries, { id, name, flag }])
    }

    const [errors, setErrors] = useState({})

    const handleBlurName = () => {
        if (form.name.length === 0) {
            setErrors({
                ...errors,
                name: "Please enter a name for the activity."
            })
        } else {
            const {name, ...newErrors} = errors
            setErrors({...newErrors})
        }
    }
    const seasons = ["Spring", "Summer", "Fall", "Winter"]

    const handleBlurDifficulty = () => {
        const difficulty = ["Very Easy", "Easy", "Moderate", "Difficult", "Very Difficult"]
        if (!difficulty.includes(form.dificultad)) {
            setErrors({ 
                ...errors,
                dificultad: "Please make a difficulty choice." })
        } else {
            const {dificultad, ...newErrors} = errors
            setErrors({...newErrors})
        }
    }

    const handleBlurDateStart = () => {
        const selectedDate = new Date(form.duracion[0])
        const currentDate = new Date()
        const stringDate = form.duracion[0]
        const stringDateEnd = form.duracion[1]

        if (stringDate.trim() === "") {
            setErrors({
                ...errors,
                dateStart: "Please provide a valid date format (YYYY-MM-DD)." })
            return;
        }
        if (selectedDate < currentDate) {
            setErrors({ 
                ...errors,
                dateStart: "Start date cannot be in the past." })
            return;
        }
         else {
            const {dateStart, dateEnd, ...newErrors} = errors
            setErrors({...newErrors})
        }
    }

    const handleBlurDateEnd = () => {
        const selectedDate = new Date(form.duracion[1])
        const currentDate = new Date()
        const stringDate = form.duracion[0]
        const stringDateEnd = form.duracion[1]

        if (stringDateEnd.trim() === "") {
            setErrors({
                ...errors,
                dateEnd: "Please provide a valid date format (YYYY-MM-DD)." })
            return;
        }
        if (selectedDate < currentDate) {
            setErrors({ 
                ...errors,
                dateEnd: "Start date cannot be in the past." })
            return;
        }
         else {
            const {dateEnd, ...newErrors} = errors
            setErrors({...newErrors})
        }
    }

    const handleBlurSelectedCountries = () => {
        if(!selectedCountries.length) {
            setErrors({
                errors,
                CountriesIds: "At least one country selection is required, with a maximum of 9 countries."
            })
            return;
        } else {
            const {CountriesIds, ...newErrors} = errors
            setErrors({...newErrors})
        }
    }


    console.log(errors.temporada);

    return (
        <div className={style.container}>
            <div className={style.leftSection}>
                <form className={style.form} action="">
                    <label htmlFor="">Name:</label>
                    <input onBlur={handleBlurName} name='name' onChange={handleInputName} value={form.name} type="text" />
                    {errors.name? <p className={style.errorMessage}>{errors.name}</p> : <p>&nbsp;</p>}
                    <label htmlFor="">Difficulty</label>
                    <select onBlur={handleBlurDifficulty} onChange={handleSelectDifficult} placeholder="Select Difficulty" name="" id="">
                        <option name="dificultad" value="placeholder">-Select an option-</option>
                        <option name="dificultad" value="Very Easy">Very Easy</option>
                        <option name="dificultad" value="Easy">Easy</option>
                        <option name="dificultad" value="Moderate">Moderate</option>
                        <option name="dificultad" value="Difficult">Difficult</option>
                        <option name="dificultad" value="Very Difficult">Very Difficult</option>
                    </select>
                    {errors.dificultad? <p className={style.errorMessage}>{errors.dificultad}</p> : <p>&nbsp;</p>}
                    <label htmlFor="">Desde:</label>
                    <input
                        onBlur={handleBlurDateStart}
                        type="date"
                        name='duracion'
                        value={form.duracion[0]}
                        onChange={handleChangeDate}
                        placeholder="Seleccione una fecha"
                    />
                    {errors.dateStart? <p className={style.errorMessage}>{errors.dateStart}</p> : <p>&nbsp;</p>}
                    <label>Hasta:</label>
                    <input
                        onBlur={handleBlurDateEnd}
                        type="date"
                        name='duracion'
                        value={form.duracion[1]}
                        onChange={handleChangeEndDate}
                    />
                    {errors.dateEnd? <p className={style.errorMessage}>{errors.dateEnd}</p> : <p>&nbsp;</p>}
                    <label htmlFor="">Season:</label>
                    <div className={style.season}>
                        <input onBlur={handleSeasons} onChange={handleSeasons} name='temporada' type="checkbox" value='Spring' />
                        <label>Spring</label>
                        <input onBlur={handleSeasons} onChange={handleSeasons} name='temporada' type="checkbox" value='Summer' />
                        <label>Summer</label>
                        <input onBlur={handleSeasons} onChange={handleSeasons} name='temporada' type="checkbox" value='Fall' />
                        <label>Fall</label>
                        <input onBlur={handleSeasons} onChange={handleSeasons} name='temporada' type="checkbox" value='Winter' />
                        <label>Winter</label>
                    </div>
                        {errors.temporada? <p className={style.errorMessage}>{errors.temporada}</p> : <p>&nbsp;</p>}
                    <label htmlFor="">Countries:</label>
                    <select disabled={selectedCountries.length >= 9} onBlur={handleBlurSelectedCountries} onChange={handleSelectCountries}>
                        <option value="">-Select an option-</option>
                        {countries?.map(country => {
                            return (
                                <option name='CountriesId' value={country.id}>{country.name}</option>
                            )
                        })}
                    </select>
                    {errors.CountriesIds? <p className={style.errorMessage}>{errors.CountriesIds}</p> : <p>&nbsp;</p>}
                </form>
            </div>
            <div className={style.rightSection}>
                {selectedCountries?.map(({ id, name, flag }) => {
                    return (
                        <div className={style.card}>
                            <NavLink className={style.container} to={`/country/${id}`}>
                                <img className={style.image} src={flag} alt="" />
                                <h2 className={style.name}>{name}</h2>
                            </NavLink>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Form;