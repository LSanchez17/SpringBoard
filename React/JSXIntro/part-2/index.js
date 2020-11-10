const Tweet = (props) => { 
    return <div>
        <h2>Username:{props.username}</h2>
        <h3>Name:{props.name}</h3>
        <h4>Date:{props.date}</h4>
        <p>{props.tweet}</p>
    </div>
}

const App = () => {
    return <div>
        <Tweet username='mrJoe' name='Joe Donovan' date='10-23-2020' tweet='My first tweet!' />
        <Tweet username='Sinbad' name='Jill Leslux' date='11-13-2021' tweet='No more covid!' />
        <Tweet username='Superuser' name='Anika Tyre' date='5-3-2200' tweet='Twitter is still used!' />
    </div>
}

ReactDOM.render(<App />, document.getElementById('root'));