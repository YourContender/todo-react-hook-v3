import { useEffect, useState }      from "react";
import FormAddTask                  from "./forms-add-task/FormAddTask";
import { API } from "../../api";
import Task                         from "./task/Task";

function ListTask({ showFormPanel, setShowFormPanel }) {
    const [finishedTask, setFinishedTask] = useState([]);
    const [unFinishedTask, setUnFinishedTask] = useState([]);
    const [editError, setEditError] = useState(null);
    const [successTaskChange, setSuccessTaskChange] = useState(false);
    const [allListTask, setAllListTask] = useState([]);

    useEffect( async () => {
        const res = await fetch(API);
        const body = await res.json();
        
        setUnFinishedTask(body.filter(item => item.done === false));
        setFinishedTask(body.filter(item => item.done === true));
        setAllListTask(body);
    }, [])

    const removeTask = async ( id ) => {
        let state = [...unFinishedTask, ...finishedTask];

        let filtered = state.filter(item => item.id !== id)
    
        const res = await fetch(`${API}/${id}`, {
            method: 'DELETE'
        })

        console.log('res status: ', res.status);
        if (res.status === 200) {
            setUnFinishedTask(filtered.filter(item => item.done === false));
            setFinishedTask(filtered.filter(item => item.done === true));
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

        const res = await fetch(API + "/" + elem.id, {
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
                    setShowFormPanel={setShowFormPanel}
                /> 
            : 
                <div>
                    <span>click on "Add new task" and enter your task</span>
                    <h4>List tasks: </h4>
                </div>
            }

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