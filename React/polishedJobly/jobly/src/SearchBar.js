import React, {useState} from 'react';

const SearchBar = ({type, search}) => {
    const [searchTerm, setSearchTerm] = useState();

    const handleChange = (evt) => {
        const {name, value} = evt.target;
        setSearchTerm(data => ({
            ...data, [name]: value
        }));
    };

    //handles empty searches, and non empty searches
    //this way we can "reset" the list of companies or jobs :D
    const isSearchEmpty = (inspectMe) => {
        for(let key in inspectMe){
            if(inspectMe[key] === ''){
                return false;
            }
        }
        return true;
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        // console.log(searchTerm)
        let passInspection = isSearchEmpty(searchTerm) ? search(searchTerm) : search();
    }

    let term = type === 'company' ? 'name' : 'title';

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor={term}>Search for a specific {type}</label>
                <input type='text' id={term} name={term} onChange={handleChange}></input>
                <button type='submit'>Search</button>
            </form>
        </div>
    );
}

export default SearchBar;