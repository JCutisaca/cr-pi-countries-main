

export function validationName(form, errors, setErrors) {
    if (form.name.length === 0) {
        setErrors({
            ...errors,
            name: "Please enter a name for the activity."
        });
    } else {
        const { name, ...newErrors } = errors;
        setErrors({ ...newErrors });
    }
}

export function validationDifficulty(form, errors, setErrors) {
    const difficulty = ["1", "2", "3", "4", "5"]
    if (!difficulty.includes(form.dificultad)) {
        setErrors({ 
            ...errors,
            dificultad: "Please make a difficulty choice." })
    } else {
        const {dificultad, ...newErrors} = errors
        setErrors({...newErrors})
    }
}

export function validationDateStart(form, errors, setErrors) {
    if (form.duracion.trim() === "") {
        setErrors({
            ...errors,
            dateStart: "The duration cannot be empty." })
        return;
    } else {
        const {dateStart, ...newErrors} = errors
        setErrors({...newErrors})
    }
}