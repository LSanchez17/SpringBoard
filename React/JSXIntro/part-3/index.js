const Person = (props) => {
    const {age, name} = props;
    let message = '';
    let shortenedName = '';
    if(age >= 18){
        message = 'Please go Vote!';
    }
    else{
        message = 'You must be 18!';
    }

    if(name.length >= 8){
        shortenedName = name.slice(0,5);
    }

    const hobbiesList = props.hobbies.map(hobby => <li>{hobby}</li>);

    return <div>
        <p>Learn some information about this person</p>
        <h3>Age:{age}</h3>
        <h3>Name:{shortenedName}</h3>
        <h2>{message}</h2>
        <ul>
            {hobbiesList}
        </ul>
    </div>
}

const App = () => {
    return <div>
        <Person age={20} name='Jim Murck' hobbies={['fishing', 'sleeping', 'Tacos']}/>
        <Person age={10} name='Tim Trough' hobbies={['Drawing', 'Snacks', 'Playtime']}/>
        <Person age={30} name='Janet Alister' hobbies={['Weekends', 'Beer', 'Beer']}/>
        <Person age={40} name='Tiffany Reese' hobbies={['Naps', 'Wine', 'Rose']}/>
    </div>
}

ReactDOM.render(<App />, document.getElementById('root'));