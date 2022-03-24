import './index.css';

const Score = ({ className, step }) => {
    return (
        <div className={"score " + className?.step}>{step}</div>
    );
};

export default Score;