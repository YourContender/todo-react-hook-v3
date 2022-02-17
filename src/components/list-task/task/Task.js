import { useState } from "react";
import { Button } from "react-bootstrap";
import EditModalTask from "../edit-task/EditModalTask";
import s from './Task.module.css';

const Task = ({ title, description, id, removeTask, editTask, editError, setEditError, success, setSuccess }) => {
    const [edit, setEdit] = useState(false);

    return (
        <li className={s.list}>
            {
                edit ? 
                    <div>   
                        <EditModalTask 
                            editTask={editTask} 
                            setEdit={setEdit} 
                            id={id} 
                            title={title} 
                            description={description}
                            editError={editError}
                            setEditError={setEditError}
                            success={success}
                            setSuccess={setSuccess}
                        />
                    </div>
                : 
                <div className={s.task_container}>
                    <div className={s.task}>
                        <div>
                            <h1 className={s.title}>
                                {title.length > 20 ? title.slice(0, 20) + '...' : title} 
                            </h1>
                            <span className={s.descr}>
                                {description.length > 40 ? description.slice(0, 40) + '...' : description}
                            </span>
                        </div>

                        <div className={s.btn}>
                            <Button onClick={() => removeTask(id)} variant="danger">delete</Button>
                            <Button className={s.btn_link} onClick={() => setEdit(true)} variant="secondary">edit</Button>
                        </div>
                    </div>
                </div>
            }
        </li>
    )
}

export default Task;