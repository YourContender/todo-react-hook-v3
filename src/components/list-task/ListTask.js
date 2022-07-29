import { useEffect, useState }      from "react";
import FormAddTask                  from "./forms-add-task/FormAddTask";
import { API_DEL_URL, API_GET_URL, API_PUT_URL } from "../../config";
import Task                         from "./task/Task";
import Error                        from "../error/Error";

function ListTask({ showFormPanel }) {
    const [finishedTask, setFinishedTask] = useState([]);
    const [unFinishedTask, setUnFinishedTask] = useState([]);
    const [editError, setEditError] = useState(null);
    const [errorValidation, setErrorValidation] = useState(false);
    const [successTaskChange, setSuccessTaskChange] = useState(false);
    const [allListTask, setAllListTask] = useState([]);

    useEffect( async () => {
        const res = await fetch(API_GET_URL);
        const body = await res.json();
        
        setUnFinishedTask(body.filter(item => item.done === false));
        setFinishedTask(body.filter(item => item.done === true));
        setAllListTask(body);
    }, [])

    const removeTask = async ( id ) => {
        let state = [...unFinishedTask, ...finishedTask];

        let filtered = state.filter(item => item.id !== id)
    
        const res = await fetch(API_DEL_URL + '/' + id, {
            method: 'DELETE'
        })

        console.log('res status: ', res.status);
        if (res.status === 200) {
            setUnFinishedTask(filtered.filter(item => item.done === false));
            setFinishedTask(filtered.filter(item => item.done === true));
        } else { //404
            setErrorValidation([res.status, res.statusText, id]);
        }
    }

    const taskDataChange = (filtered) => {
        console.log(filtered);
        setAllListTask(filtered);
        setUnFinishedTask(filtered.filter(item => item.done === false));
        setFinishedTask(filtered.filter(item => item.done === true));
    }

    const editStateTask = async(elem) => {
        console.log('id: ', elem.id);
        console.log('done: ', elem.done);
        console.log('important: ', elem.important);

        let state = [...unFinishedTask, ...finishedTask];

        let filtered = state.map(item => {
            if (item.id === elem.id) {
                return {
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    status: item.status,
                    done: elem.done,
                    important: elem.important
                }
            }
            return item
        })

        let data = {
            id: elem.id,
            title: elem.title,
            description: elem.description,
            status: elem.status,
            done: elem.done,
            important: elem.important
        }

        const res = await fetch(API_PUT_URL + "/" + elem.id, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        if (res.status === 200) {
            console.log(filtered);
            setFinishedTask(filtered.filter(item => item.done === true))
            setUnFinishedTask(filtered.filter(item => item.done === false));
        }
    }

    return (
        <div>
            {showFormPanel ? 
                <FormAddTask 
                    unFinishedTask={unFinishedTask}
                    setUnFinishedTask={setUnFinishedTask}
                    errorValidation={errorValidation} 
                    setErrorValidation={setErrorValidation} 
                /> 
            : 
                <div>
                    <span>click on "Add new task" and enter your task</span>
                    <h4>List tasks: </h4>
                </div>
            }

            {errorValidation && <Error error={setErrorValidation} setError={errorValidation}/>}

            <ul>
                {
                    unFinishedTask.map(item => {
                        return (
                            <Task 
                                state={unFinishedTask}
                                allListTask={allListTask}
                                item={item}
                                key={item.id} 
                                removeTask={removeTask}
                                editError={editError}
                                setEditError={setEditError}
                                successTaskChange={successTaskChange}
                                setSuccessTaskChange={setSuccessTaskChange}
                                taskDataChange={taskDataChange}
                                editStateTask={editStateTask}
                            />
                        )
                    })
                }
            </ul>

            {finishedTask.length > 0 && <div style={{border: '1px solid gray', marginTop: '50px', marginBottom: '50px'}}></div>}

            <ul>
                {
                    finishedTask.map(item => {
                        return (
                            <Task 
                                state={finishedTask}
                                allListTask={allListTask}
                                item={item}
                                key={item.id} 
                                removeTask={removeTask}
                                editError={editError}
                                setEditError={setEditError}
                                successTaskChange={successTaskChange}
                                setSuccessTaskChange={setSuccessTaskChange}
                                taskDataChange={taskDataChange}
                                editStateTask={editStateTask}
                            />
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default ListTask;