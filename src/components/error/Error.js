import { Toast } from 'react-bootstrap';
import s from './Error.module.css';

function Error({ setError, error }) {
    return (
        <div onClick={() => setError(undefined)}>
            <Toast style={{'backgroundColor': 'rgba(134, 106, 106, 0.541)', 'marginTop': '-40px'}}>
                <Toast.Header>
                    <strong className="me-auto">Error: </strong>
                </Toast.Header>
                <Toast.Body>
                    {/* <div>
                        {error.title ? 
                            <span style={{'color': 'red'}}>
                                Error title: {error.title}
                            </span> : null
                        }
                    </div>
                    <div>
                        {error.description ? 
                            <span style={{'color': 'red'}}>
                                Error description: {error.description}
                            </span> : null
                        }
                    </div> */}
                    {Array.isArray(error) ? 
                        <h1>
                            status code: {error[0]}  error: {error[1]} {error[2] ?
                                <span>
                                    ID: {error[2]}
                                </span> :
                            null}
                        </h1> :
                    null}
                    
                </Toast.Body>
            </Toast>
        </div>
    )
}

export default Error;