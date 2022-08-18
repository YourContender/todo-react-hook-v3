import { ErrorMessage, Field } from "formik";
import s from './FormField.module.css';

const FormField = ({ type, name, id }) => {
    return (
        <>
            <div className={s.block}>
                <span className="text">{`enter ${name}`}</span>

                <Field
                    className={s.input}
                    type={type} 
                    name={name}
                    id={id}
                />
            </div>
            <ErrorMessage className={s.error} name={name} component='div'/>
        </>
    )
}

export default FormField;