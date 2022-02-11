import { useEffect, useState } from "react";
import FormAddTask from "./forms-add-task/FormAddTask";
import { API_DEL_URL, API_GET_URL, API_POST_URL, API_PUT_URL } from "../../config";
import Task from "./Task";
import Error from "../error/Error";

function ListTask() {
    const [state, setState] = useState([]);
    const [error, setError] = useState(undefined);
     
    // useEffect(() => {
    //     fetch(API_GET_URL)
    //         .then((response) => {
    //             if (!response.ok) {
    //                 setError(true)
    //                 throw new Error('hello world!')
    //             }

    //             return response.json()
    //         })
    //         .then(data => setState(data))
    // }, [])

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
            console.log(body)

            if (res.status === 422) {
                setError(body.errors)
            } else if (res.status === 201) {
                setState([...state, body])
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
            setError(body.errors)
        } else if (res.status === 200) {
            setState(filtered)
        } else {
            setError([res.status, res.statusText])
        }
    }

    return (
        <div>
            {error && <Error setError={setError} error={error}/>}
            <FormAddTask addTask={addNewTask}/>
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