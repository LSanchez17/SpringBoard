import './App.css';

const Box = ({id, color, width, height, remove}) => {
    const boxStyle = {
        backgroundColor: color,
        width: `${width}px`,
        height: `${height}px`,
        padding: width, height,
        color: 'white',
        margin: 'auto'
    }

    console.log(id)

    // console.log(boxStyle)
    
    const boxBegone = () => remove(id);

    return (
        <div className="App">
          <div id={color} style={boxStyle}>
            <p>Im the box</p>
            <button onClick={boxBegone}>X</button>
          </div>
        </div>
    );
}

export default Box;
