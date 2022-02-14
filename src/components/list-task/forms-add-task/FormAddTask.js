import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import s from './FormAddTask.module.css';

const FormAddTask = ({ addTask, error }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    
    let classTitle = null;
    let classDescr = null;

    if (error) {
        classTitle = error.title ? classTitle = s.input : null
        classDescr = error.description ? classDescr = s.input : null
    }

    const createNewTask = () => {
        const currentTask = {
            title,
            description,
            status: 1
        }

        addTask(currentTask);
        setTitle('');
        setDescription('');
    }

    return (
        <div>
            <Form>
                <Form.Group className="mb-3 mt-3">
                    <Form.Label>Enter title</Form.Label>
                    <Form.Control className={classTitle} onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder="введите заголовок" />

                    {error ? error.title ? <Alert className={s.error} variant="danger">
                        <span>{error.title}</span>
                    </Alert> : null : null}

                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label>Enter description</Form.Label>
                    <Form.Control className={classDescr} onChange={(e) => setDescription(e.target.value)} value={description} name='description' as="textarea" rows={2} placeholder="введите описание"/>
                   
                    {error ? error.description ? <Alert className={s.error} variant="danger">
                         <span>{error.description}</span> 
                    </Alert> : null : null}

                </Form.Group>
            </Form>
            <Button className={s.btn} onClick={() => createNewTask()} variant="primary">Добавить</Button>
        </div>
    )
}

export default FormAddTask;