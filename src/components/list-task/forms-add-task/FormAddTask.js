import { useState }     from "react";
import { Formik, Form } from "formik";
import { API } from "../../../api";
import * as Yup         from 'yup';
import preloader        from '../../spinner/spinner.gif';
import s                from './FormAddTask.module.css';
import ButtonComponent from "../../button/Button";
import FormField from "../../forms/FormField";

const FormAddTask = ({ unFinishedTask, setUnFinishedTask, setShowFormPanel }) => {
    const [loadingTask, setLoadingTask] = useState(false);

    const addNewTask = async (title, description) => { 
        setLoadingTask(true);

        const res = await fetch(API, {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                description: description,
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
            setLoadingTask(false);
            setShowFormPanel(false);
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
                addNewTask(title, description);
            }}
        >
            <Form>
                <FormField 
                    type="text" 
                    name="title"
                    id="title"
                    textTitle='enter'
                />

                <FormField 
                    type="text" 
                    name="description"
                    id="description"
                    textTitle='enter'
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
                        textBtn="clear all"
                    />
                </div>
            
                <div className={s.loading}>
                    { loadingTask && <img src={preloader} alt="preloader"/> }
                </div>
            </Form>
        </Formik>
    )
}

export default FormAddTask;