import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const FormAddTask = ({ addTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const createNewTask = () => {
        const currentTask = {
            title,
            description,
            status: 1
        }

        addTask(currentTask);
    }

    return (
        <div>
            <Form>
                <Form.Group className="mb-3 mt-3">
                    <Form.Label>Enter title</Form.Label>
                    <Form.Control onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder="введите заголовок" />
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label>Enter description</Form.Label>
                    <Form.Control onChange={(e) => setDescription(e.target.value)} value={description} name='description' as="textarea" rows={2} placeholder="введите описание"/>
                </Form.Group>
            </Form>
            <Button onClick={() => createNewTask()} variant="primary">Добавить</Button>
        </div>
    )
}

export default FormAddTask;