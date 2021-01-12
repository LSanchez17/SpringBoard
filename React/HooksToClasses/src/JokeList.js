import React, { Component } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

// function JokeList({ numJokesToGet = 10 }) {
//   const [jokes, setJokes] = useState([]);

//   /* get jokes if there are no jokes */

//   useEffect(function() {
//     async function getJokes() {
//       let j = [...jokes];
//       let seenJokes = new Set();
//       try {
//         while (j.length < numJokesToGet) {
//           let res = await axios.get("https://icanhazdadjoke.com", {
//             headers: { Accept: "application/json" }
//           });
//           let { status, ...jokeObj } = res.data;
  
//           if (!seenJokes.has(jokeObj.id)) {
//             seenJokes.add(jokeObj.id);
//             j.push({ ...jokeObj, votes: 0 });
//           } else {
//             console.error("duplicate found!");
//           }
//         }
//         setJokes(j);
//       } catch (e) {
//         console.log(e);
//       }
//     }

//     if (jokes.length === 0) getJokes();
//   }, [jokes, numJokesToGet]);

//   /* empty joke list and then call getJokes */

//   function generateNewJokes() {
//     setJokes([]);
//   }

//   /* change vote for this id by delta (+1 or -1) */

//   function vote(id, delta) {
//     setJokes(allJokes =>
//       allJokes.map(j => (j.id === id ? { ...j, votes: j.votes + delta } : j))
//     );
//   }

//   /* render: either loading spinner or list of sorted jokes. */

//   if (jokes.length) {
//     let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);
  
//     return (
//       <div className="JokeList">
//         <button className="JokeList-getmore" onClick={generateNewJokes}>
//           Get New Jokes
//         </button>
  
//         {sortedJokes.map(j => (
//           <Joke text={j.joke} key={j.id} id={j.id} votes={j.votes} vote={vote} />
//         ))}
//       </div>
//     );
//   }

//   return null;

// }

// export default JokeList;


class JokeList extends Component{
  static defaultProps = {
    numJokesToGet: 10
  };

  constructor(props){
    super(props);
    this.state = {
      jokes: []
    };

    this.vote = this.vote.bind(this);
    this.generateNewJokes = this.generateNewJokes.bind(this);
  }

  //so we dont have useEffect, so we rever to mount(run first time)
  //and didUpdate(run when component rerenders) blergh
  //So hence, these two methods run at mount, and upon updating component
  componentDidMount(){
    if(this.state.jokes.length < this.props.numJokesToGet){
      this.getJokes();
    }
  }

  componentDidUpdate(){
    if(this.state.jokes.length < this.props.numJokesToGet){
      this.getJokes()
    }
  }

  async getJokes(){
    try{
      let jokes = this.state.jokes; //object with a joke array
      //if we have stored votes for the user, load them, otherwise start an empty array
      let jokeVotes = JSON.parse(window.localStorage.getItem('jokeVotes') || '{}');
      //sets are unique, hence the seenJokes nomenclature
      let seenJokes = new Set(jokes.map(joke => joke.id));

      while(jokes.length < this.props.numJokesToGet){
        let res = await axios.get('https://icanhazdadjoke.com', {
          headers: { Accept: 'application/json'}
        });
        let {status, ...joke } = res.data;

        if(!seenJokes.has(joke.id)){
          seenJokes.add(joke.id);
          jokeVotes[joke.id] = jokeVotes[joke.id] || 0; //update if exists, else 0
          jokes.push({...joke, votes: jokeVotes[joke.id]});
        }
        else{
          console.log('duplicate found!');
        }
      }

      this.setState({jokes}); //emulating a setState hook, by calling the variable and updating it!
      window.localStorage.setItem('jokeVotes', JSON.stringify(jokeVotes));
      //store it! ^
    }
    catch(e){
      console.log('duplicate found!');
    }
  }

  generateNewJokes(){
    //Emulate the dependencies of a setEffect hook.
    //We "clear" the state, triggering the componentDidUpdate, which repopulates the state!
    this.setState(this.jokes = {jokes:[]});
  }

  vote(id, delta){
    let jokeVotes = JSON.parse(window.localStorage.getItem("jokeVotes"));
    jokeVotes[id] = (jokeVotes[id] || 0) + delta;
    window.localStorage.setItem("jokeVotes", JSON.stringify(jokeVotes));
    this.setState(st => ({
      jokes: st.jokes.map(j =>
        j.id === id ? { ...j, votes: j.votes + delta } : j
      )
    }));
  }

  render(){
      let sortedJokes = [...this.state.jokes].sort((a, b) => b.votes - a.votes);
    
      return (
        <div className="JokeList">
          <button className="JokeList-getmore" onClick={this.generateNewJokes}>
            Get New Jokes
          </button>
          
          {sortedJokes.map(j => (
            <Joke text={j.joke} 
                  key={j.id} 
                  id={j.id} 
                  votes={j.votes} 
                  vote={this.vote} />
          ))}
    
          {sortedJokes.length < this.props.numJokesToGet ?
          (
          <div className="loading">
            <i className="fas fa-4x fa-spinner fa-spin" />
          </div>
          ) : null}
        </div>
      );
    }
}

export default JokeList;