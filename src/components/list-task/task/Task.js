import { useState }        from "react";
import { Button }          from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditModalTask       from "../edit-task/EditModalTask";
import s                   from './Task.module.css';
import { 
    faEdit, faTrash, faCircleExclamation, faTriangleExclamation, faCheck, faCheckDouble 
} from '@fortawesome/free-solid-svg-icons';


const Task = ({ 
    removeTask, editTask, editError, setEditError, successTaskChange, setSuccessTaskChange, item, taskDataChange, editStateTask, allListTask
}) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [important, setImportant] = useState(false);
    const [done, setDone] = useState(item.done);

    const addTaskToCompleted = () => {
        setDone(!done);
        
        let elem = {
            id: item.id,
            title: item.title,
            description: item.description,
            status: item.status,
            done: !done,
            important: important
        }

        editStateTask(elem);
    }

    return (
        <li className={s.list}>
            <div className={done ? s.done : null}>
                {
                    showEditModal ? 
                        <div>   
                            <EditModalTask 
                                item={item}
                                editTask={editTask} 
                                setShowEditModal={setShowEditModal} 
                                editError={editError}
                                setEditError={setEditError}
                                successTaskChange={successTaskChange}
                                setSuccessTaskChange={setSuccessTaskChange}
                                taskDataChange={taskDataChange}
                                allListTask={allListTask}
                            />
                        </div>
                    : 
                    <div className={s.task_container}>
                        <div className={s.task}>
                            <div>
                                <h1 className={s.title}>
                                    {item.title.length > 20 ? item.title.slice(0, 20) + '...' : item.title} 
                                </h1>
                                <span className={s.descr}>
                                    {item.description.length > 40 ? item.description.slice(0, 40) + '...' : item.description}
                                </span>
                            </div>

                            <div className={s.btn}>
                                <Button 
                                    onClick={() => removeTask(item.id)} 
                                    variant="danger"
                                >
                                    <FontAwesomeIcon icon={faTrash}/>
                                </Button>
                                
                                <Button 
                                    className={s.btn_link} 
                                    onClick={() => setShowEditModal(true)} 
                                    variant="secondary"
                                >
                                    <FontAwesomeIcon icon={faEdit}/>
                                </Button>

                                <Button 
                                    className={s.btn_link} 
                                    onClick={() => addTaskToCompleted()}
                                    variant="primary"
                                >
                                    <FontAwesomeIcon icon={important ? faCircleExclamation : faTriangleExclamation}/>
                                </Button>

                                <Button 
                                    className={s.btn_link} 
                                    onClick={() => addTaskToCompleted()}
                                    variant="success"
                                >
                                    <FontAwesomeIcon icon={done ? faCheckDouble : faCheck}/>
                                </Button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </li>
    )
}

export default Task;