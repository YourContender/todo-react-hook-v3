// import { Form }         from "react-bootstrap";
import AlertError from "../error/AlertError";
import { ErrorMessage, Field, Form } from "formik";

const FormField = (props) => {
    const {type, name, text, error, touched, rows, as, id} = props;

    console.log('props error alert: ', error);

    return (
        <>
            <p>{text}</p>

            <Field
                type={type ? type : null} 
                rows={rows ? rows : null}
                as={as}
                name={name}
                id={id}
                placeholder={text} 
            />

            {
                (error && touched) ? 
                    // <AlertError 
                    //     value={"danger"} 
                    //     textError={error}
                    // />
                    <div>пиздец</div>
                : null
            }
            {/* <ErrorMessage className='error' name='name' component='div'/> */}
        </>
    )
}

export default FormField;