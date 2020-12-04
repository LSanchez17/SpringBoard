import React, {useState} from 'react';
import styles from './App.css';


const EightBall = ({answers}) => {
    const [answer, setAnswer] = useState('Ask A Question');
    const [color, setColor] = useState('black');

    const picksAnswer = (arr) => {
        let lengthOfAnswers = answers.length - 1;
        let randomAnswer = Math.floor(Math.random() * lengthOfAnswers);
        return arr[randomAnswer];
    }

    const askTheBall = () => {
        let chosenReply = picksAnswer(answers);
        setAnswer(chosenReply.msg);
        setColor(chosenReply.color);
    }

    return(
        <div className={'EightBall'} style={{backgroundColor: color}}>
            <h1>{answer}</h1>
            <div>
                <button onClick={askTheBall}> Ask away</button>
            </div>
        </div>
    )
}

export default EightBall;