import { useState }            from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { API_POST_URL }        from "../../../config";
import s                       from './FormAddTask.module.css';
import preloader               from '../../spinner/spinner.gif';
import AlertError from "../../error/AlertError";

const FormAddTask = ({ unFinishedTask, setUnFinishedTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loadingTask, setLoadingTask] = useState(false);
    const [validationTitle, setValidationTitle] = useState(false);
    const [validationDescr, setValidationDescr] = useState(false);

    let classTitle = null;
    let classDescr = null;

    if (validationTitle) {
        classTitle = validationTitle ? classTitle = s.input : null
    }

    if (validationDescr) {
        classDescr = validationDescr ? classDescr = s.input : null
    }

    const cancelAddNewTask = () => {
        setTitle('');
        setDescription('');
        setValidationTitle(false);
        setValidationDescr(false);
    } 

    const addNewTask = async () => {      
        setLoadingTask(true);

        if (title.length < 4 && description.length < 4) {
            setValidationDescr(true);
            setValidationTitle(true);
            setLoadingTask(false);
        } else if(description.length < 4) {
            setValidationDescr(true);
            setValidationTitle(false);
            setLoadingTask(false);
        } else if(title.length < 4) {
            setValidationTitle(true);
            setValidationDescr(false)
            setLoadingTask(false);
        } else {
            try {
                const res = await fetch(API_POST_URL, {
                    method: 'POST',
                    body: JSON.stringify({
                        title,
                        description,
                        status: 1,
                        done: false,
                        important: false
                    }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
    
                const body = await res.json();
    
                if (res.status === 201) {
                    setUnFinishedTask([body, ...unFinishedTask]);
                    setTitle('');
                    setDescription('');  
                    setLoadingTask(false);
                    setValidationTitle(false);
                    setValidationDescr(false);
                }
            } catch(err) {
                console.log('hello hello', err);
            }
        }     
    }

    return (
        <div>
            <Form>
                <Form.Group className="mb-3 mt-3">
                    <Form.Label>Enter title</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="введите заголовок" 
                        className={classTitle} 
                        onChange={(e) => setTitle(e.target.value)} 
                        value={title} 
                    />

                    {
                        validationTitle && <AlertError value={"danger"} textError={'enter more than 4 characters in title'}/>
                    }

                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label>Enter description</Form.Label>
                    <Form.Control 
                        className={classDescr} 
                        onChange={(e) => setDescription(e.target.value)} 
                        value={description} 
                        name='description' 
                        as="textarea" 
                        rows={2} 
                        placeholder="введите описание"
                    />
                   
                    {
                        validationDescr && <AlertError value={"danger"} textError={'enter more than 4 characters in description'}/>
                    }

                </Form.Group>
            </Form>
            <div>
                <Button className={s.btn} onClick={() => addNewTask()} variant="primary">create</Button>
                <Button className={s.btn} onClick={() => cancelAddNewTask()} variant="outline-secondary">cancel</Button>
            </div>
           
            <div className={s.loading}>
                {
                    loadingTask && <img src={preloader} alt="preloader"/> 
                }
            </div>
        
        </div>
    )
}

export default FormAddTask;