import './App.css';
import {useParams} from 'react-router-dom';

function Dog() {
    const defaultDogs = [
        {
          name: "Whiskey",
          age: 5,
          src: "/dogpics/whiskey.jpg",
          facts: [
            "Whiskey loves eating popcorn.",
            "Whiskey is a terrible guard dog.",
            "Whiskey wants to cuddle with you!"
          ]
        },
        {
          name: "Duke",
          age: 3,
          src: "/dogpics/duke.jpg",
          facts: [
            "Duke believes that ball is life.",
            "Duke likes snow.",
            "Duke enjoys pawing other dogs."
          ]
        },
        {
          name: "Perry",
          age: 4,
          src: "/dogpics/perry.jpg",
          facts: [
            "Perry loves all humans.",
            "Perry demolishes all snacks.",
            "Perry hates the rain."
          ]
        },
        {
          name: "Tubby",
          age: 4,
          src: "/dogpics/tubby.jpg",
          facts: [
            "Tubby is really stupid.",
            "Tubby does not like walks.",
            "Angelina used to hate Tubby, but claims not to anymore."
          ]
        }
    ]
  //get dog name from params
  const {dogName} = useParams();
  let dogData = null;

  for(let i=0; i<defaultDogs.length; i++){
      if(defaultDogs[i].name.toUpperCase() === dogName.toUpperCase()){
          dogData = defaultDogs[i];
      }
  }

  let altText = `A picture of ${dogData.name}`;
  return (
    <div className="App">
      <p>This is {dogData.name}, they are {dogData.age} old</p>
      <ul>
          <li>{dogData.facts[0]}</li>
          <li>{dogData.facts[1]}</li>
          <li>{dogData.facts[2]}</li>
      </ul>
      <img src={dogData.src} alt={altText}/>
    </div>
  );
}

export default Dog;
