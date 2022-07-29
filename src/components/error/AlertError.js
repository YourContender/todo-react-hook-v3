import { Alert } from "react-bootstrap";
import s from './AlertError.module.css';

function AlertError({value, textError}) {
    return (
        <Alert className={s.error} variant={value}>
            <span>{textError}</span>
        </Alert> 
    )
}

export default AlertError;