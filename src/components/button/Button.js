import { Button } from "react-bootstrap";
import s from './Button.module.css';

function ButtonComponent({value, textBtn, disabled, type}) {
    return (
        <Button 
            className={s.btn} 
            variant={value}
            disabled={disabled}
            type={type}
        >
            {textBtn}
        </Button>
    )
}

export default ButtonComponent;