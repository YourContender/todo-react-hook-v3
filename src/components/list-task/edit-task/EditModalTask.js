import { useState }                   from 'react';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon }            from "@fortawesome/react-fontawesome";
        import { faSave, faSquareXmark }      from '@fortawesome/free-solid-svg-icons';
import { API_PUT_URL }                from '../../../config';
import preloader                      from '../../spinner/spinner.gif';
import s                              from './EditModalTask.module.css';

function EditModalTask({ state, item, setShowEditModal, editError, setEditError, successTaskChange, setSuccessTaskChange, taskDataChange }) {
    const [editTitle, setEditTitle] = useState(item.title);
    const [editDescr, setEditDescr] = useState(item.description);
    const [loadingTask, setLoadingTask] = useState(false);

    let classTitle = null;
    let classDescr = null;

    if (editError) {
        classTitle = editError.title ? classTitle = s.input : null
        classDescr = editError.description ? classDescr = s.input : null
    } 
    
    const editTask = async () => {
        setLoadingTask(true);

        let filtered = state.map(elem => {
            if (elem.id === item.id) {
                return {
                    id: item.id,
                    title: editTitle, 
                    description: editDescr,
                    status: 1
                }
            }
            return elem
        })
    
        let data = {
            id: item.id,
            title: editTitle, 
            description: editDescr, 
            status: 1
        }
    
        const res = await fetch(API_PUT_URL + "/" + item.id, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }
        })

        const body = await res.json();
        
        if (res.status === 422) {
            setEditError(body.errors);
            setLoadingTask(false);
            setSuccessTaskChange(false);
        } else if (res.status === 200) {
            taskDataChange(filtered);
            setEditError(null);
            setSuccessTaskChange(true);
            setLoadingTask(false);
        } else {
            setEditError([res.status, res.statusText]);
            setLoadingTask(false);
            setSuccessTaskChange(false);
        }
    }

    const cancelEdit = () => {
        setShowEditModal(false);
        setEditError(undefined);
        setSuccessTaskChange(false);
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
                                placeholder="?????????????? ??????????????????" 
                                defaultValue={item.title}
                                className={classTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                            />

                            {
                                editError &&
                                    editError.title ? 
                                        <Alert className={s.error} variant="danger">
                                            <span>{editError.title}</span>
                                        </Alert> 
                                    : null
                            }

                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Enter description</Form.Label>
                            <Form.Control 
                                name='description' 
                                as="textarea" 
                                rows={2} 
                                placeholder="?????????????? ????????????????"
                                defaultValue={item.description}
                                className={classDescr}
                                onChange={(e) => setEditDescr(e.target.value)}
                            />

                            {
                                editError && 
                                    editError.description ? 
                                        <Alert className={s.error} variant="danger">
                                            <span>{editError.description}</span>
                                        </Alert> 
                                    : null 
                            }

                        </Form.Group>

                        {
                            Array.isArray(editError) && 
                                <Alert className={s.error} variant="danger">
                                    <span>{editError[0] + ' : ' + editError[1]}</span>
                                </Alert> 
                        }

                        {
                            successTaskChange && 
                                <Alert className={s.success} variant="info">
                                    <span>success</span>
                                </Alert> 
                        }

                        <div className={s.loading}>
                            {
                                loadingTask && <img src={preloader} alt="preloader"/> 
                            }
                        </div>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => cancelEdit()} variant="secondary"><FontAwesomeIcon icon={faSquareXmark}/></Button>
                    <Button onClick={() => editTask()} variant="primary"><FontAwesomeIcon icon={faSave}/></Button>
                </Modal.Footer>
                </Modal.Dialog>
            </div>
        </div>
    )   
}

export default EditModalTask;