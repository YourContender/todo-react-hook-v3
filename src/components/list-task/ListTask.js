import { useEffect, useState }      from "react";
import FormAddTask                  from "./forms-add-task/FormAddTask";
import { API_DEL_URL, API_GET_URL } from "../../config";
import Task                         from "./task/Task";
import Error                        from "../error/Error";

function ListTask({ showFormPanel }) {
    const [state, setState] = useState([]);
    const [editError, setEditError] = useState(null);
    const [errorValidation, setErrorValidation] = useState(null);
    const [successTaskChange, setSuccessTaskChange] = useState(false);

    useEffect( async () => {
        const res = await fetch(API_GET_URL);
        const body = await res.json();
        
        setState(body)
    }, [])

    const removeTask = async ( id ) => {
        let filtered = state.filter(item => item.id !== id)
    
        const res = await fetch(API_DEL_URL + '/' + id, {
            method: 'DELETE'
        })

        if (res.status === 200) {
            setState(filtered);
        } else {
            setErrorValidation([res.status, res.statusText, id]);
        }
    }

    const taskDataChange = (filtered) => {
        setState(filtered)
    }

    return (
        <div>
            {showFormPanel ? 
                <FormAddTask 
                    state={state}
                    setState={setState} 
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

            {/* {!errorValidation &&  */}
                <ul>
                    {
                        state.map(item => {
                            return (
                                <Task 
                                    state={state}
                                    item={item}
                                    key={item.id} 
                                    removeTask={removeTask}
                                    editError={editError}
                                    setEditError={setEditError}
                                    successTaskChange={successTaskChange}
                                    setSuccessTaskChange={setSuccessTaskChange}
                                    taskDataChange={taskDataChange}
                                />
                            )
                        })
                    }
                </ul>
            {/* } */}
        </div>
    )
}

export default ListTask;