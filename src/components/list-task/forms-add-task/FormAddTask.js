import { useState }            from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { API_POST_URL }        from "../../../config";
import s                       from './FormAddTask.module.css';
import preloader               from '../../spinner/spinner.gif';

const FormAddTask = ({ state, setState, errorValidation, setErrorValidation }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loadingTask, setLoadingTask] = useState(false);

    let classTitle = null;
    let classDescr = null;

    if (errorValidation) {
        classTitle = errorValidation.title ? classTitle = s.input : null
        classDescr = errorValidation.description ? classDescr = s.input : null
    }

    const cancelAddNewTask = () => {
        setTitle('');
        setDescription('');
        setErrorValidation(null);
    } 

    const addNewTask = async () => {      
        setLoadingTask(true);

        try {
            const res = await fetch(API_POST_URL, {
                method: 'POST',
                body: JSON.stringify({
                    title,
                    description,
                    status: 1
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            const body = await res.json();

            if (res.status === 422) {
                setErrorValidation(body.errors);
                setLoadingTask(false);
            } else if (res.status === 201) {
                setState([body, ...state]);
                setTitle('');
                setDescription('');
                setLoadingTask(false);
                setErrorValidation(null);
            } else {
                setErrorValidation([res.status, res.statusText]);
                setLoadingTask(false);
            }

        } catch(err) {
            console.log('hello hello', err);
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
                        errorValidation && 
                            errorValidation.title ? 
                                <Alert className={s.error} variant="danger">
                                    <span>{errorValidation.title}</span>
                                </Alert> 
                            : null 
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
                        errorValidation && 
                            errorValidation.description ? 
                                <Alert className={s.error} variant="danger">
                                    <span>{errorValidation.description}</span> 
                                </Alert> 
                            : null 
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