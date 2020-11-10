const FirstComponent = () => {
    return <h1>My first component!</h1>
}

const NamedComponent = (props) => {
return <p>My name is {props.name}</p>
}

const App = () => {
    return <div>
        <FirstComponent />
        <NamedComponent name='Luis' />
    </div>
}

ReactDOM.render(<App />, document.getElementById('root'));