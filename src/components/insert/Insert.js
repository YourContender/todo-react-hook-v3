import s from './Insert.module.css';

const Insert = () => {
    return (
        <div>
            <div className={s.top}></div>
            <div className={s.bottom}></div>
            <span className={s.text}>
                <strong>
                    Слава Україні!
                </strong>
            </span>
        </div>
    )
}

export default Insert;