import { ErrorMessage, Field } from "formik";
import s from './FormField.module.css';

const FormField = ({ type, name, id, value, textTitle, placeholder, onClick }) => {
    return (
        <>
            <div className={s.block}>
                <span>{`${textTitle} ${name}`}</span>

                <Field
                    className={s.input}
                    type={type} 
                    name={name}
                    id={id}
                    value={value}
                    placeholder={placeholder}
                    onClick={onClick}
                />
            </div>
            <ErrorMessage className={s.error} name={name} component='div'/>
        </>
    )
}

export default FormField;