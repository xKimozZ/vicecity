import styles from './Button.module.css';

const Button = ({buttonText='Sample', hoverFunction, selectFunction}) => {
    return (
        <div className={styles.buttonContainer} onMouseEnter={hoverFunction} onClick={selectFunction}>
            {buttonText}
        </div>
    )
}

export default Button;