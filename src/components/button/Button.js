import { Button } from "react-bootstrap";
import s from './Button.module.css';

function ButtonComponent({value, method, textBtn}) {
    return (
        <Button 
            className={s.btn} 
            onClick={() => method()} 
            variant={value}
        >
            {textBtn}
        </Button>
    )
}

export default ButtonComponent;