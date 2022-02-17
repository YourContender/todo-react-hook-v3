import { useEffect, useState } from "react";
import FormAddTask from "./forms-add-task/FormAddTask";
import { API_DEL_URL, API_GET_URL, API_POST_URL, API_PUT_URL } from "../../config";
import Task from "./task/Task";
import Error from "../error/Error";

function ListTask({ add }) {
    const [state, setState] = useState([]);
    const [error, setError] = useState(undefined);
    const [editError, setEditError] = useState(undefined);
    const [success, setSuccess] = useState(false);

    useEffect( async () => {
        const res = await fetch(API_GET_URL);
        const body = await res.json();
        
        setState(body)
    }, [])

    const addNewTask = async (task) => {        
        try {
            const res = await fetch(API_POST_URL, {
                method: 'POST',
                body: JSON.stringify(task),
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                }
            });

            const body = await res.json();
            console.log(res)

            if (res.status === 422) {
                setError(body.errors)
            } else if (res.status === 201) {
                setState([body, ...state])
            } else {
                setError([res.status, res.statusText])
            }

        } catch(err) {
            console.log('hello hello', err);
        }
    }

    const removeTask = async (id) => {
        let filtered = state.filter(item => item.id !== id)
    
        const res = await fetch(API_DEL_URL + '/' + id, {
            method: 'DELETE'
        })

        if (res.status === 200) {
            setState(filtered)
        } else {
            setError([res.status, res.statusText, id])
        }

    }

    const editTask = async (title, descr, id) => {
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
    
        const res = await fetch(API_PUT_URL + "/" + id, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }
        })

        const body = await res.json();
        
        if (res.status === 422) {
            setEditError(body.errors)
        } else if (res.status === 200) {
            setState(filtered)
            setSuccess(true)
        } else {
            setEditError([res.status, res.statusText])
        }
    }

    return (
        <div>
            {add ? 
                <FormAddTask error={error} setError={setError} addTask={addNewTask}/> : 
                <div>
                    <span>click on "Add new task" and enter your task</span>
                    <h4>List tasks: </h4>
                </div>
            }
            {error && <Error setError={setError} error={error}/>}
            {!error && 
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
                                    editError={editError}
                                    setEditError={setEditError}
                                    success={success}
                                    setSuccess={setSuccess}
                                />
                            )
                        })
                    }
                </ul>
            }
        </div>
    )
}

export default ListTask;