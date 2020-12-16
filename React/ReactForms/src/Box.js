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
          <div id={color} style={boxStyle} data-testid={color}>
            <p>Im the box</p>
            <button onClick={boxBegone}>Box Begone</button>
          </div>
        </div>
    );
}

export default Box;
