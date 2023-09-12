import style from './CardActivity.module.css'
import deleteIcon from '../Images/deleteIcon.svg'
import editIcon from '../Images/editIcon.svg'
import { deleteActivity, updateFormActivity } from '../Redux/actions'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import saveIcon from '../Images/saveIcon.svg'
import unSaveIcon from '../Images/unSaveIcon.svg'

const CardActivity = ({ id, name, dificultad, duracion, temporada }) => {

    const [updateForm, setUpdateForm] = useState({})

    const dispatch = useDispatch()
    const deleteActivityHandler = (ActivityId) => {
        dispatch(deleteActivity(ActivityId))
        window.alert("The activity has been deleted.")
    }
    const ActivityId = id
    const [edit, setEdit] = useState(false)

    const handlerEdit = (ActivityId) => {
        if (!edit) {
            setEdit(true)
            setUpdateForm({
                ActivityId: id,
                name,
                dificultad,
                duracion,
                temporada
            })
        } else {
            setEdit(false)
            setUpdateForm()
        }
    }
    const handleChangeName = (event) => {
        setUpdateForm({
            ...updateForm,
            name: event.target.value
        })
    }
    const handleSelectDifficult = (event) => {
        setUpdateForm({
            ...updateForm,
            dificultad: event.target.value
        })
    }

    const handleSeasons = (event) => {
        if (event.target.checked) {
            setUpdateForm({
                ...updateForm,
                temporada: [...updateForm.temporada, event.target.value]
            })
        } else {
            setUpdateForm({
                ...updateForm,
                temporada: updateForm.temporada.filter(season => season !== event.target.value)
            })
        }
    }

    const handlChangeDuracion = (event) => {
        setUpdateForm({
            ...updateForm,
            duracion: event.target.value
        })
    }

    const sendUpdateForm = () => {
        dispatch(updateFormActivity(updateForm))
        setEdit(!edit)
    }

    return (
        <div className={style.cardActivity} key={id}>

            {!edit && <div className={style.containerIcons}>
                <img onClick={handlerEdit} className={style.editIcon} title='Edit' src={editIcon} />
                <img onClick={() => deleteActivityHandler(ActivityId)} title='Delete' className={style.deleteIcon} src={deleteIcon} />
            </div>}
            {edit ? <label className={style.inputName} htmlFor="">Name:</label> : null}
            {!edit ? <h2>{name}</h2> : <input className={style.inputs} type='text' onChange={handleChangeName} value={updateForm.name}></input>}
            {edit ? <label className={style.inputName} htmlFor="">Dificultad:</label> : null}
            {!edit ? <h3>Difficulty: {dificultad}</h3> :
                <select value={updateForm.dificultad} className={style.inputs} onChange={handleSelectDifficult} placeholder="Select Difficulty" name="" id="">
                    <option name="dificultad" value="0">-Select an option-</option>
                    <option name="dificultad" value="1">Very Easy</option>
                    <option name="dificultad" value="2">Easy</option>
                    <option name="dificultad" value="3">Moderate</option>
                    <option name="dificultad" value="4">Difficult</option>
                    <option name="dificultad" value="5">Very Difficult</option>
                </select>}
            {edit ? <label className={style.inputName} htmlFor="">Duracion in Hours:</label> : null}
            {!edit ? <h3>{duracion} Hours</h3> :
                <input
                    onChange={handlChangeDuracion}
                    className={style.inputs}
                    type="number"
                    name='duracion'
                    value={updateForm.duracion}
                    placeholder="Enter duration in hours..."
                />
            }
            {edit ? <label className={style.inputName} htmlFor="">Season:</label> : null}
            {!edit ? temporada.map(season => {
                return (
                    <h3 key={season}>{season}</h3>
                )
            }) : <div className={style.season}>
                <input className={style.checked} checked={updateForm.temporada.includes("Spring")} onChange={handleSeasons} name='temporada' type="checkbox" value='Spring' />
                <label>Spring</label>
                <br />
                <input className={style.checked} checked={updateForm.temporada.includes("Summer")} onChange={handleSeasons} name='temporada' type="checkbox" value='Summer' />
                <label>Summer</label>
                <br />
                <input className={style.checked} checked={updateForm.temporada.includes("Fall")} onChange={handleSeasons} name='temporada' type="checkbox" value='Fall' />
                <label>Fall</label>
                <br />
                <input className={style.checked} checked={updateForm.temporada.includes("Winter")} onChange={handleSeasons} name='temporada' type="checkbox" value='Winter' />
                <label>Winter</label>
            </div>
            }
            {edit && <div className={style.containerIconsSave}>
                <img onClick={sendUpdateForm} className={style.save} title='Save' src={saveIcon} />
                <img onClick={handlerEdit} className={style.unSave} title='Cancel' src={unSaveIcon} />
            </div>}
        </div>
    )
}

export default CardActivity;