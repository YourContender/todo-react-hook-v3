import { Button } from "react-bootstrap";
import s from './Button.module.css';

function ButtonComponent({value, textBtn, disabled, type, func, style}) {
    return (
        <Button 
            className={style ? s.style : s.btn} 
            variant={value}
            disabled={disabled}
            type={type}
            onClick={() => func(false)}
        >
            {textBtn}
        </Button>
    )
}

export default ButtonComponent;