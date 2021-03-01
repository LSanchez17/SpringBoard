import React from 'react';

const Job = ({title, salary, equity, company}) => {
    return (
        <div className='card'>
            <h3 className='card-title font-italic'>{title}</h3>
            <h4 className='card-subtitle'>${salary}</h4>
            <h4 className='card-text'>equity: {equity ? equity : <small>None</small>}</h4>
            <p className='a-active'>{company}</p>
            <div className='justify-content-right'>
                <button className='btn btn-primary'>Apply</button>
            </div>
        </div>
    );
}

export default Job;