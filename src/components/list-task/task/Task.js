import { useState }        from "react";
import { Button }          from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import EditModalTask       from "../edit-task/EditModalTask";
import s                   from './Task.module.css';


const Task = ({ removeTask, editTask, editError, setEditError, successTaskChange, setSuccessTaskChange, item, state, taskDataChange }) => {
    const [showEditModal, setShowEditModal] = useState(false);

    return (
        <li className={s.list}>
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
                            state={state}
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
                        </div>
                    </div>
                </div>
            }
        </li>
    )
}

export default Task;