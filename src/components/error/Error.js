import { Toast } from 'react-bootstrap';

function Error({ setError, error }) {
    return (
         <div onClick={() => setError(undefined)}>
            {Array.isArray(error) ?
                <Toast style={{'backgroundColor': 'rgba(134, 106, 106, 0.541)', 'marginTop': '-40px'}}>
                    <Toast.Header>
                        <strong className="me-auto">Error: </strong>
                    </Toast.Header>
                    <Toast.Body>
                        
                            <h1>
                                status code: {error[0]}  error: {error[1]} {error[2] ?
                                    <span>
                                        ID: {error[2]}
                                    </span> :
                                null}
                            </h1> :
                        
                    </Toast.Body>
                </Toast>
            : null}
        </div> 
    )
}

export default Error;