import React from 'react';

const Job = ({title, salary, equity, company}) => {
    return (
        <div>
            <h3>{title}</h3>
            <h4>${salary}</h4>
            <h4>equity: {equity ? equity : <small>None</small>}</h4>
            <p>{company}</p>
        </div>
    );
}

export default Job;