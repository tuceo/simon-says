import './App.css';
import {useEffect, useState} from "react";
import Button from "./components/Button";
import Score from "./components/Score";

function App() {
    const [step, setStep] = useState(0);
    const [randomOrders, setRandomOrders] = useState([]);
    const [colors, setColors] = useState([]);
    const [userChoices, setUserChoices] = useState([]);
    const [className, setClassName] = useState(null);
    const [isStarted, setIsStarted] = useState(false);

    const buttonProps = [
        {id: 0, className: "quarter-circle-left-top "},
        {id: 3, className: "quarter-circle-left-bottom "},
        {id: 1, className: "quarter-circle-right-top "},
        {id: 2, className: "quarter-circle-right-bottom "},
    ];

    const handleUserChoices = (choice) => {
        if (isStarted) {
            setUserChoices([...userChoices, choice]);
            setClassName({[choice]: "transition-effect"})
            setTimeout(() => {
                setClassName(null)
            }, 2000);
        }
    }

    useEffect(() => {
        if (step > 0) {
            const number = Math.floor(Math.random() * (0 - 4) + 4);
            setRandomOrders([...randomOrders, number]);
            setUserChoices([]);
        }
    }, [step]);

    useEffect(() => {
        if (userChoices.length > 0 && userChoices.length === randomOrders.length && JSON.stringify(randomOrders) === JSON.stringify(userChoices)) {
            setClassName({step: "step-success-effect"})
            setTimeout(() => {
                setClassName(null)
                setStep(step + 1);
            }, 1000)
        }
        randomOrders?.map((item, index) => {
            if(userChoices[index] && item !== userChoices[index]) {
                setIsStarted(false);
                setRandomOrders([]);
                setUserChoices([]);
            }
        })
    }, [userChoices]);

    useEffect(() => {
        setColors(randomOrders)
    }, [randomOrders]);

    useEffect(() => {
        if (colors?.length > 0) {
            setTimeout(() => {
                setColors(colors.slice(1))
            }, 1000)
        }

    }, [colors]);

    return (
        <div className="App">
            <div className="container">
                <h1>Simon Says</h1>

                <div className="circle">
                    <div>
                        {buttonProps.slice(0, 2).map((item) => {
                            return <Button
                                key={item?.id}
                                value={item?.id}
                                handleUserChoices={handleUserChoices}
                                style={item?.className}
                                colors={colors}
                                className={className}
                            />
                        })}
                    </div>
                    <Score className={className} step={step}/>
                    <div>
                        {buttonProps.slice(2, 4).map((item) => {
                            return <Button
                                key={item?.id}
                                value={item?.id}
                                handleUserChoices={handleUserChoices}
                                style={item?.className}
                                colors={colors}
                                className={className}
                            />
                        })}
                    </div>
                </div>

                {!isStarted && <button onClick={() => {
                    setIsStarted(true);
                    setStep(1);
                }}>Start</button>}
            </div>
        </div>
    );
}

export default App;