import { useState } from 'react';
import s from './EditModalTask.module.css';

function EditModalTask({ editTask, setEdit, id, title, description }) {
    const [editTitle, setEditTitle] = useState(title);
    const [editDescr, setEditDescr] = useState(description);

    const saveTask = () => {
        setEdit(false);
        editTask(editTitle, editDescr, id);
    }

    return (
        <div className={s.edit}>
            <input defaultValue={title} onChange={(e) => setEditTitle(e.target.value)} />
            <input defaultValue={description} onChange={(e) => setEditDescr(e.target.value)} />
            <button onClick={() => saveTask()}>edit</button>
        </div>
    )   
}

export default EditModalTask;