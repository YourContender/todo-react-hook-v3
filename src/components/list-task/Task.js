import { useState } from "react";
import { Button } from "react-bootstrap";

const Task = ({ title, description, id, removeTask, editTask }) => {
    const [edit, setEdit] = useState(false);
    const [editTitle, setEditTitle] = useState(title);
    const [editDescr, setEditDescr] = useState(description);
    
    const saveTask = () => {
        setEdit(false);
        editTask(editTitle, editDescr, id);
    }

    return (
        <li>
            {
                edit ? 
                    <div>
                        <input defaultValue={title} onChange={(e) => setEditTitle(e.target.value)} />
                        <input defaultValue={description} onChange={(e) => setEditDescr(e.target.value)} />
                        <button onClick={() => saveTask()}>edit</button>
                    </div>
                : 
                <div>
                    <h1>
                        {title.length > 20 ? title.slice(0, 20) + '...' : title} 
                    </h1>
                    <span>
                        {description.length > 40 ? description.slice(0, 40) + '...' : description}
                    </span>

                    <div>
                        <Button onClick={() => removeTask(id)} variant="danger">delete</Button>
                        <Button onClick={() => setEdit(true)} variant="secondary">edit</Button>
                    </div>
                </div>
            }
        </li>
    )
}

export default Task;