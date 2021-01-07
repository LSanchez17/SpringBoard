import './App.css';
import {useParams} from 'react-router-dom';

const Colors = () => {
    //This component renders a color from the url parameter
    const {color} = useParams();

    const backgroundColor = {
        backgroundColor: color,
        color: color
    };

    console.log(color)
    
    return (
        <div style={backgroundColor}>
            <h1>I'm the color {color}!</h1>
        </div>
    )
}

export default Colors;