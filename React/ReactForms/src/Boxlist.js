import {useState} from 'react';
import Box from './Box';
import NewBoxForm from './NewBoxForm';

const Boxlist = () => {
    const [boxes, setBoxes] = useState([]);

    const addNewBox = (box) => {
        //get box data from NewBoxForm, spread it
        // console.log(box)
        setBoxes([...boxes, box]);
    }

    const removeBox = (id) => {
        // console.log(boxes)
        setBoxes(boxes => boxes.filter(box => box.id !== id));
    }

    const renderBoxes = boxes.map((box, idx) => {
        return <Box key={idx} id={box.id} color={box.color} width={box.width} height={box.height} remove={removeBox} />
    })


    return (
        <div className="App">
            {renderBoxes}
            <br />
            <NewBoxForm addBox={addNewBox}/>
        </div>
    );
}

export default Boxlist;
