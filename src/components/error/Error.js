import s from './Error.module.css';

function Error({ setError, error }) {
    return (
        <div className={s.error} onClick={() => setError(undefined)}>
            <h2>
                {error.title}
            </h2>
            <h2>
                {error.description}
            </h2>

            {Array.isArray(error) ? 
                <h1>
                    status code: {error[0]}  error: {error[1]} {error[2] ?
                         <span>
                             ID: {error[2]}
                         </span> :
                    null}
                </h1> :
            null}
        </div>
    )
}

export default Error;