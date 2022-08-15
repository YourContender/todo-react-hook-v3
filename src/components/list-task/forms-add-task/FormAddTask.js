import { useState }     from "react";
import { useFormik }    from "formik";
import { API } from "../../../api";
import * as Yup         from 'yup';
import preloader        from '../../spinner/spinner.gif';
import s                from './FormAddTask.module.css';
import ButtonComponent from "../../button/Button";
import FormField from "../../forms/FormField";

const FormAddTask = ({ unFinishedTask, setUnFinishedTask, setShowFormPanel }) => {
    const [loadingTask, setLoadingTask] = useState(false);

    const formik = useFormik({
        initialValues: {
            title: '',
            description: ''
        },
        validationSchema: Yup.object({
            title: Yup.string()
                    .min(4, 'the number of letters is less than four')
                    .required('required input'),
            description: Yup.string()
                    .min(4, 'the number of letters is less than four')
                    .required('required input')
        })
    })  

    const resetValues = () => {
        formik.values.title = '';
        formik.values.description = '';
    }

    const cancelAddNewTask = () => {
        resetValues();
        setLoadingTask(true);
        
        setTimeout(() => {
            setLoadingTask(false);
        }, 500) 
    } 

    const addNewTask = async () => { 
        if (formik.values.title.length > 4 && formik.values.description.length > 4) {   // исправить
            setLoadingTask(true);

            const res = await fetch(API, {
                method: 'POST',
                body: JSON.stringify({
                    title: formik.values.title,
                    description: formik.values.description,
                    status: 1,
                    done: false,
                    important: false
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            const body = await res.json();

            if (res.status === 201) {
                setUnFinishedTask([body, ...unFinishedTask]);
                resetValues();
                setLoadingTask(false);
                setShowFormPanel(false);
            }
        }
    }

    return (
        <>
            <FormField 
                type="text"
                name="title"
                text="enter title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.title}
                touched={formik.touched.title}
            />

            <FormField 
                name="description"
                text="Enter description"
                rows={2}
                as="textarea"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.description}
                touched={formik.touched.description}
            />
            
            <div>
                <ButtonComponent 
                    value="primary" 
                    method={addNewTask} 
                    textBtn="create"
                />
                
                <ButtonComponent 
                    value="outline-secondary" 
                    method={cancelAddNewTask} 
                    textBtn="cancel"
                />
            </div>
           
            <div className={s.loading}>
                { loadingTask && <img src={preloader} alt="preloader"/> }
            </div>
        
        </>
    )
}

export default FormAddTask;