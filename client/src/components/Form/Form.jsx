import { useSelector } from 'react-redux';
import style from './Form.module.css'
import { useState } from 'react';
import { NavLink } from 'react-router-dom'

const Form = () => {
    const [form, setForm] = useState({
        name: "",
        dificultad: "",
        duracion: [],
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



    console.log(selectedCountries);

    return (
        <div className={style.container}>
            <div className={style.leftSection}>
                <form className={style.form} action="">
                    <label htmlFor="">Name:</label>
                    <input name='name' onChange={handleInputName} value={form.name} type="text" />
                    <label htmlFor="">Difficulty</label>
                    <select onChange={handleSelectDifficult} placeholder="Select Difficulty" name="" id="">
                        <option name="dificultad" value="placeholder">-Select an option-</option>
                        <option name="dificultad" value="Very Easy">Very Easy</option>
                        <option name="dificultad" value="Easy">Easy</option>
                        <option name="dificultad" value="Moderate">Moderate</option>
                        <option name="dificultad" value="Difficult">Difficult</option>
                        <option name="dificultad" value="Very Difficult">Very Difficult</option>
                    </select>
                    <label htmlFor="">Desde:</label>
                    <input
                        type="date"
                        name='duracion'
                        value={form.duracion[0]}
                        onChange={handleChangeDate}
                        placeholder="Seleccione una fecha"
                    />
                    <label>Hasta:</label>
                    <input
                        type="date"
                        name='duracion'
                        value={form.duracion[1]}
                        onChange={handleChangeEndDate}
                    />
                    <label htmlFor="">Season:</label>
                    <div className={style.season}>
                        <input onChange={handleSeasons} name='temporada' type="checkbox" value='Spring' />
                        <label>Spring</label>
                        <input onChange={handleSeasons} name='temporada' type="checkbox" value='Summer' />
                        <label>Summer</label>
                        <input onChange={handleSeasons} name='temporada' type="checkbox" value='Fall' />
                        <label>Fall</label>
                        <input onChange={handleSeasons} name='temporada' type="checkbox" value='Winter' />
                        <label>Winter</label>
                    </div>
                    <label htmlFor="">Countries:</label>
                    <select onChange={handleSelectCountries}>
                        <option value="">-Select an option-</option>
                        {countries?.map(country => {
                            return (
                                <option name='CountriesId' value={country.id}>{country.name}</option>
                            )
                        })}
                    </select>
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