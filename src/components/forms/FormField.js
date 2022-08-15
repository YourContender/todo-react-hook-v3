import { Form }         from "react-bootstrap";
import AlertError from "../error/AlertError";

const FormField = (props) => {
    const {type, name, text, value, onChange, onBlur, error, touched, rows, as} = props;

    return (
        <Form>
            <Form.Group className="mb-3 mt-3">
                <Form.Label>{text}</Form.Label>
                
                <Form.Control 
                    type={type ? type : null} 
                    rows={rows ? rows : null}
                    as={as}
                    name={name}
                    placeholder={text} 
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                />

                {
                    (error && touched) ? 
                        <AlertError 
                            value={"danger"} 
                            textError={error}
                        />
                    : null
                }
            </Form.Group>
        </Form>
    )
}

export default FormField;