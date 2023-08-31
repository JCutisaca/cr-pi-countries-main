import { useSelector } from 'react-redux';
import style from './Form.module.css'
import { useState } from 'react';

const Form = () => {

    const [date, setDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const countries = useSelector(state => state.countriesCopy)

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };
    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    return (
        <div className={style.container}>
            <div className={style.leftSection}>
                <form className={style.form} action="">
                    <label htmlFor="">Name:</label>
                    <input type="text" />
                    <label htmlFor="">Difficulty</label>
                    <select placeholder="Select Difficulty" name="" id="">
                        <option value="placeholder">-Select an option-</option>
                        <option value="1">Very Easy</option>
                        <option value="2">Easy</option>
                        <option value="3">Moderate</option>
                        <option value="4">Difficult</option>
                        <option value="5">Very Difficult</option>
                    </select>
                    <label htmlFor="">Desde:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={handleDateChange}
                        placeholder="Seleccione una fecha"
                    />
                    <label>Hasta:</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={handleEndDateChange}
                    />
                    <label htmlFor="">Season:</label>
                    <div className={style.season}>
                        <input type="checkbox" value='Spring' />
                        <label>Spring</label>
                        <input type="checkbox" value='Summer' />
                        <label>Summer</label>
                        <input type="checkbox" value='Fall' />
                        <label>Fall</label>
                        <input type="checkbox" value='Winter' />
                        <label>Winter</label>
                    </div>
                    <label htmlFor="">Countries:</label>
                    <select name="" id="">
                        <option value="">-Select an option-</option>
                        {countries?.map(country => {
                            return (
                                <option value={country.name}>{country.name}</option>
                            )
                        })}
                    </select>
                </form>
            </div>
            <div>

            </div>
        </div>
    )
}

export default Form;