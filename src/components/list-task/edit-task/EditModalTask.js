import { useState } from 'react';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import s from './EditModalTask.module.css';

function EditModalTask({ editTask, setEdit, id, title, description, editError, setEditError, success, setSuccess }) {
    const [editTitle, setEditTitle] = useState(title);
    const [editDescr, setEditDescr] = useState(description);

    let classTitle = null;
    let classDescr = null;

    if (editError) {
        classTitle = editError.title ? classTitle = s.input : null
        classDescr = editError.description ? classDescr = s.input : null
    } 
    
    const saveTask = () => {
        editTask(editTitle, editDescr, id);
        setEditError(undefined);
        setSuccess(false)
    }

    const cancelEdit = () => {
        setEdit(false);
        setEditError(undefined);
        setSuccess(false)
    }

    return (
        <div className={s.container}>
            <div className={s.edit}>
                <Modal.Dialog>
                <Modal.Header >
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3 mt-3">
                            <Form.Label>Enter title</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="введите заголовок" 
                                defaultValue={title}
                                className={classTitle}
                                onClick={() => setEditError(undefined)}
                                onChange={(e) => setEditTitle(e.target.value)}
                            />

                            {editError ? editError.title ? <Alert className={s.error} variant="danger">
                                <span>{editError.title}</span>
                            </Alert> : null : null}

                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Enter description</Form.Label>
                            <Form.Control 
                                name='description' 
                                as="textarea" 
                                rows={2} 
                                placeholder="введите описание"
                                defaultValue={description}
                                className={classDescr}
                                onClick={() => setEditError(undefined)}
                                onChange={(e) => setEditDescr(e.target.value)}
                            />

                            {editError ? editError.description ? <Alert className={s.error} variant="danger">
                                <span>{editError.description}</span>
                            </Alert> : null : null}

                        </Form.Group>

                        {Array.isArray(editError) ? <Alert className={s.error} variant="danger">
                            <span>{editError[0] + ' : ' + editError[1]}</span>
                        </Alert> : null}

                        {success ? <Alert className={s.success} variant="info">
                            <span>success</span>
                        </Alert> : null}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => cancelEdit()} variant="secondary">Close</Button>
                    <Button onClick={() => saveTask()} variant="primary">edit</Button>
                </Modal.Footer>
                </Modal.Dialog>
            </div>
        </div>
    )   
}

export default EditModalTask;