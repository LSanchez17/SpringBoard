import React, {useState} from 'react';

const SearchBar = ({type, search}) => {
    const [searchTerm, setSearchTerm] = useState();

    const handleChange = (evt) => {
        const {name, value} = evt.target;
        setSearchTerm(data => ({
            ...data, [name]: value
        }));
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        search(searchTerm);
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='identifier'>Search for a specific {type}</label>
                <input type='text' id='identifier' name='identifier' onChange={handleChange}></input>
            </form>
        </div>
    );
}

export default SearchBar;