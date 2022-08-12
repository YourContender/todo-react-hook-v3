import { useState }     from "react";
import { useFormik }    from "formik";
import { Button, Form } from "react-bootstrap";
import { API_POST_URL } from "../../../config";
import * as Yup         from 'yup';
import AlertError       from "../../error/AlertError";
import preloader        from '../../spinner/spinner.gif';
import s                from './FormAddTask.module.css';

const FormAddTask = ({ unFinishedTask, setUnFinishedTask }) => {
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

    const cancelAddNewTask = () => {
        formik.values.title = '';
        formik.values.description = '';
        setLoadingTask(true);
        
        setTimeout(() => {
            setLoadingTask(false);
        }, 500) 
    } 

    const addNewTask = async () => { 
        setLoadingTask(true);

        try {
            const res = await fetch(API_POST_URL, {
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
                formik.values.title = '';
                formik.values.description = '';
                setLoadingTask(false);
            }
        } catch(err) {
            console.log('hello hello', err);
        }
    }

    return (
        <div>
            <Form onSubmit={formik.handleSubmit}>

                <Form.Group className="mb-3 mt-3">
                    <Form.Label>Enter title</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="title"
                        placeholder="введите заголовок" 
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    {
                        (formik.errors.title && formik.touched.title) ? 
                            <AlertError 
                                value={"danger"} 
                                textError={formik.errors.title}
                            />
                        : null
                    }
                </Form.Group>

                <Form.Group className="mb-2">
                    <Form.Label>Enter description</Form.Label>
                    <Form.Control 
                        rows={2} 
                        as="textarea" 
                        name='description' 
                        placeholder="введите описание"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                   
                    {
                        (formik.errors.description && formik.touched.description) ?
                            <AlertError 
                                value={"danger"} 
                                textError={formik.errors.description}
                            /> 
                        : null
                    }
                </Form.Group>
            
            </Form>
            <div>
                <Button 
                    className={s.btn} 
                    onClick={() => addNewTask()} 
                    variant="primary"
                >
                    create
                </Button>

                <Button 
                    className={s.btn} 
                    onClick={() => cancelAddNewTask()} 
                    variant="outline-secondary"
                >
                    cancel
                </Button>
            </div>
           
            <div className={s.loading}>
                {
                    loadingTask && <img src={preloader} alt="preloader"/> 
                }
            </div>
        
        </div>
    )
}

export default FormAddTask;