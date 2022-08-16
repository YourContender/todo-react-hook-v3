import { useState }     from "react";
import { Formik, Form, resetForm, Field, ErrorMessage }    from "formik";
import { API } from "../../../api";
import * as Yup         from 'yup';
import preloader        from '../../spinner/spinner.gif';
import s                from './FormAddTask.module.css';
import ButtonComponent from "../../button/Button";
import FormField from "../../forms/FormField";

const FormAddTask = ({ unFinishedTask, setUnFinishedTask, setShowFormPanel }) => {
    const [loadingTask, setLoadingTask] = useState(false);

    const addNewTask = async (title, description) => { 
        // const { title, description } = formik.values;
        // if (title.length > 4 && description.length > 4) {   // исправить
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
        // }
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
            {/* {({formik}) => ( */}
                <Form>
                    {/* <FormField 
                        id="title"
                        type="text"
                        name="title"
                        text="enter title"
                    /> */}
                    <p>{`enter title`}</p>

                    <Field
                        type="text" 
                        name="title"
                        id="title"
                    />
                    <ErrorMessage className='error' name='title' component='div'/>

                    <p>{`enter description`}</p>

                    <Field
                        type="text" 
                        name="description"
                        id="description"
                    />
                    <ErrorMessage className='error' name='description' component='div'/>


                    {/* <FormField 
                        id="description"
                        name="description"
                        text="Enter description"
                        rows={2}
                        as="textarea"
                    /> */}
                
                    <div>
                        <ButtonComponent 
                            value="primary" 
                            type="submit"
                            textBtn="create"
                        />
                        
                        <ButtonComponent 
                            // onClick={() => formik.resetForm()}
                            type="reset"
                            textBtn="clear all"
                            value="outline-secondary" 
                        />
                    </div>
                
                    <div className={s.loading}>
                        { loadingTask && <img src={preloader} alt="preloader"/> }
                    </div>
                </Form>
            {/* )} */}
        </Formik>
    )
}

export default FormAddTask;