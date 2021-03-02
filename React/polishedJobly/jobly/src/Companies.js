import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import JoblyApi from './helpers/backEndAPI';
import {Link} from 'react-router-dom';

const Companies = () => {
    //make a call to apiHelper
    //render the companies as individual props with their own link
    let [listCompanies, setListCompanies] = useState([]);

    //This hook will render every company at first
    //Then if we submit a search term, we search the api
    //and reset the state, so a render of JUST the search term
    useEffect( () => {
        const getAllCompanies = async () => {
            let data = await JoblyApi.getAllCompanies();
            setListCompanies(data);
            // console.log(listCompanies)
        }

        getAllCompanies();
    }, [setListCompanies]);

    let companyRender = listCompanies.length > 0 ? listCompanies.map(company => {
        return <div className='card' key={company.handle}>
                    <div className='card-body'>
                        <Link to={`/companies/${company.handle}`}>{company.name}</Link>
                        <h2 className='card-title'>{company.name}</h2>
                        <h4 className='card-subtitle'>{company.description}</h4>
                        <p className='card-text'>{company.numEmployees}</p>
                        <img src={`${company.logoUrl}`} alt={`${company.name}`} />
                    </div>
                </div>
        }) : null;

        const search = async (searchTerm = {}) => {
        // console.log(searchTerm)
        let data = await JoblyApi.getCompanyFromSearch(searchTerm);
        setListCompanies(data);
    }

    return (
        <div className='shadow align-content-center'>           
            <br/>
            <SearchBar type='company' search={search}/>
            <br />
            {companyRender ? companyRender : <div className='spinner-border'><span class="sr-only">Loading...</span></div>}
        </div>
    );
}

export default Companies;