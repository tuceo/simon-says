import './index.css';

const Button = ({style, handleUserChoices, colors, className, value}) => {
    return (
        <div
            className={style + (colors[0] === value ? "transition-effect " : "") + className?.[value]}
            onClick={() => handleUserChoices(value)}/>
    );
};

export default Button;