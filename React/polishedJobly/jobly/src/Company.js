import React from 'react';

const Company = ({name, description, numEmployees, imageURL}) => {
    console.log(imageURL)
    return (
        <div>
            <h3>{name}</h3>
            <p>{description}</p>
            <small>{numEmployees} Employees</small>
            <br />
            <img src={imageURL} alt={`${name} company`}></img>
        </div>
    );
}

export default Company;