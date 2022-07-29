import { useState }            from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { API_POST_URL }        from "../../../config";
import s                       from './FormAddTask.module.css';
import preloader               from '../../spinner/spinner.gif';

const FormAddTask = ({ unFinishedTask, setUnFinishedTask, setErrorValidation }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loadingTask, setLoadingTask] = useState(false);
    const [test, setTest] = useState(false);

    let classTitle = null;
    let classDescr = null;

    if (test) {
        classTitle = test ? classTitle = s.input : null
        classDescr = test ? classDescr = s.input : null
    }

    const cancelAddNewTask = () => {
        setTitle('');
        setDescription('');
        setErrorValidation(false);
        setTest(false)
    } 

    const addNewTask = async () => {      
        setLoadingTask(true);

        if (title.length < 4) {
            setTest(true);
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
                    setErrorValidation(false); 
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
                        test ? 
                            <Alert className={s.error} variant="danger">
                                <span>hello world</span>
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
                        test ? 
                            <Alert className={s.error} variant="danger">
                                <span>hey hey</span> 
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