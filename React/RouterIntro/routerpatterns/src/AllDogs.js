import './App.css';
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

function AllDogs({dogs = defaultDogs}) {

  return (
    <div className="App">
     {dogs.map(dogData => (
    <div>
      <p>This is {dogData.name}, they are {dogData.age} old</p>
      <img src={dogData.src} alt={dogData.name}/>
    </div>
      ))}
    </div>
  );
}

export default AllDogs;
