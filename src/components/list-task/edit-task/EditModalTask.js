import { Formik, Form } from 'formik';
import * as Yup         from 'yup';
import { useState }                   from 'react';
import FormField from "../../forms/FormField";
import { API }                from '../../../api';
import preloader                      from '../../spinner/spinner.gif';
import s                              from './EditModalTask.module.css';
import ButtonComponent from '../../button/Button';

function EditModalTask({ allListTask, item, taskDataChange, setShowEditModal }) {
    const [loadingTask, setLoadingTask] = useState(false);
    
    const editTask = async (newTitle, newDescr) => {
        setLoadingTask(true);

        let filtered = allListTask.map(elem => {
            if (elem.id === item.id) {
                return {
                    id: item.id,
                    title: newTitle, 
                    description: newDescr,
                    status: 1,
                    done: item.done,
                    important: false
                }
            }
            return elem
        })
    
        let data = {
            id: item.id,
            title: newTitle, 
            description: newDescr, 
            status: 1,
            done: item.done,
            important: false
        }
    
        const res = await fetch(`${API}/${item.id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        
        if (res.status === 200) {
            taskDataChange(filtered);
            setLoadingTask(false);
            setShowEditModal(false);
        } 
    }

    return (
        <Formik
            initialValues = {{
                title: '',
                description: ''
            }}
            validationSchema = {Yup.object({
                title: Yup.string()
                        .min(4, 'the number of letters is less than four')
                        .required('required input'),
                description: Yup.string()
                        .min(4, 'the number of letters is less than four')
                        .required('required input')
            })} 
            onSubmit = {({ title, description }) => {
                editTask(title, description)
            }}
        >
            <div className={s.container}>
                <div className={s.edit}>
                    <div className={s.editTitle}>
                        Edit modal task
                    </div>
                    
                    <Form>
                        <FormField 
                            type="text" 
                            name="title"
                            id="title"
                            placeholder='enter your title'
                            textTitle='edit '
                        />

                        <FormField 
                            type="text" 
                            name="description"
                            id="description"
                            placeholder='enter your description'
                            textTitle='edit '
                        />
                    
                        <div>
                            <ButtonComponent 
                                value="primary" 
                                type="submit"
                                textBtn="create"
                            />
                            
                            <ButtonComponent 
                                value="outline-secondary" 
                                type="reset"
                                textBtn="reset"
                            />

                            <ButtonComponent
                                func={setShowEditModal}
                                value='danger'
                                textBtn='&times;'
                                style='close'
                            />
                        </div>
                    
                        <div className={s.loading}>
                            { loadingTask && <img src={preloader} alt="preloader"/> }
                        </div>
                    </Form>
                </div>
            </div>
        </Formik>
    )   
}
{/* <FontAwesomeIcon icon={faSave}/> */}

export default EditModalTask;