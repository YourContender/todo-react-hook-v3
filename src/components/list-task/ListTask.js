import { useEffect, useState } from "react";
import FormAddTask from "./forms-add-task/FormAddTask";
import { API_DEL_URL, API_GET_URL, API_POST_URL, API_PUT_URL } from "../../config";
import Task from "./Task";
import Error from "../error/Error";

function ListTask() {
    const [state, setState] = useState([]);
    const [error, setError] = useState('');
     
    useEffect(() => {
        fetch(API_GET_URL)
            .then(res => res.json())
            .then(data => setState(data))
    }, [])

    const addNewTask = (task) => {         
        fetch(API_POST_URL, {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then(data => setState([...state, data]))
        .catch(error => setError(error))
    }

    const removeTask = (id) => {
        let filtered = state.filter(item => item.id !== id)
    
        fetch(API_DEL_URL + '/' + id, {
            method: 'DELETE'
        })
        .then(res => res.text())
        .then(setState(filtered))
    }

    const editTask = (title, descr, id) => {
        let filtered = state.map(item => {
            if (item.id === id) {
                return {
                    id,
                    title: title, 
                    description: descr,
                    status: 1
                }
            }
            return item
        })
    
        let data = {
            id,
            title, 
            description: descr, 
            status: 1
        }
    
        fetch(API_PUT_URL + "/" + id, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then(setState(filtered))
        .catch((err) => console.log(err))
    }

    return (
        <div>
            {error ? <Error /> : null}
            <FormAddTask addTask={addNewTask}/>
            <ul>
                {
                    state.map(item => {
                        return (
                            <Task 
                                key={item.id} 
                                id={item.id}
                                title={item.title}
                                description={item.description}
                                removeTask={removeTask}
                                editTask={editTask}
                            />
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default ListTask;