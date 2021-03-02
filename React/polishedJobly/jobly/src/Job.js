import React from 'react';

const Job = ({identifier, title, salary, equity, company}) => {

    /*  Fix, make sure user can "apply" and not sort it here,
        Make a upper function that calls the job id to the user method, and thats it, 
        next rerender will not have apply since user has it.
        dirty fix 
    */
    const apply = () => {
        // console.log(identifier)
        let whichDiv = document.getElementById(identifier);

        whichDiv.classList = 'd-none';
    }

    return (
        <div className='card'>
            <h3 className='card-title font-italic'>{title}</h3>
            <h4 className='card-subtitle'>${salary}</h4>
            <h4 className='card-text'>equity: {equity ? equity : <small>None</small>}</h4>
            <p className='a-active'>{company}</p>
            <div id={identifier} className='justify-content-right'>
                <button onClick={apply} className='btn btn-primary'>Apply</button>
            </div>
        </div>
    );
}

export default Job;