import { useState }                   from 'react';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon }            from "@fortawesome/react-fontawesome";
import { faSave, faSquareXmark }      from '@fortawesome/free-solid-svg-icons';
import { API }                from '../../../api';
import preloader                      from '../../spinner/spinner.gif';
import s                              from './EditModalTask.module.css';

function EditModalTask({ 
    allListTask, item, setShowEditModal, editError, successTaskChange, setSuccessTaskChange, taskDataChange 
}) {
    const [editTitle, setEditTitle] = useState(item.title);
    const [editDescr, setEditDescr] = useState(item.description);
    const [loadingTask, setLoadingTask] = useState(false);
    const [test, setTest] = useState(false);

    let classTitle = null;
    let classDescr = null;

    if (test) {
        classTitle = test ? classTitle = s.input : null
        classDescr = test ? classDescr = s.input : null
    } 

    const editCurrentTask = () => {
        if (editTitle.length < 4) {
            return setTest(true);
        } else {
            return editTask()
        }
    }
    
    const editTask = async () => {
        setLoadingTask(true);

        let filtered = allListTask.map(elem => {
            if (elem.id === item.id) {
                return {
                    id: item.id,
                    title: editTitle, 
                    description: editDescr,
                    status: 1,
                    done: item.done,
                    important: false
                }
            }
            return elem
        })
    
        let data = {
            id: item.id,
            title: editTitle, 
            description: editDescr, 
            status: 1,
            done: item.done,
            important: false
        }
    
        const res = await fetch(`${API}/${item.id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }
        })
        
        if (res.status === 200) {
            taskDataChange(filtered);
            setTest(false);
            setSuccessTaskChange(true);
            setLoadingTask(false);
        } 
    }

    const cancelEdit = () => {
        setShowEditModal(false);
        setTest(false);
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
                                placeholder="введите заголовок" 
                                defaultValue={item.title}
                                className={classTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                            />

                            {
                                test ? 
                                    <Alert className={s.error} variant="danger">
                                        <span>error</span>
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
                                placeholder="введите описание"
                                defaultValue={item.description}
                                className={classDescr}
                                onChange={(e) => setEditDescr(e.target.value)}
                            />

                            {
                                test ?
                                    <Alert className={s.error} variant="danger">
                                        <span>error</span>
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
                    <Button onClick={() => editCurrentTask()} variant="primary"><FontAwesomeIcon icon={faSave}/></Button>
                </Modal.Footer>
                </Modal.Dialog>
            </div>
        </div>
    )   
}

export default EditModalTask;