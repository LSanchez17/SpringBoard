import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import JoblyApi from './helpers/backEndAPI';
import {Link} from 'react-router-dom';

const Companies = () => {
    //make a call to apiHelper
    //render the companies as individual props with their own link
    let [listCompanies, setListCompanies] = useState([]);
    let [specificCompany, setSpecificCompany] = useState([]);

    useEffect( () => {
        const getAllCompanies = async () => {
            let data = await JoblyApi.getAllCompanies();
            setListCompanies(data);
            // console.log(listCompanies)
        }

        getAllCompanies();
    }, []);

    let companyRender = listCompanies.length > 0 ? listCompanies.map(company => {
        return <div key={company.handle}>
                <Link to={`/companies/${company.handle}`}>{company.name}</Link>
                <h2>{company.name}</h2>
                <h4>{company.description}</h4>
                <p>{company.numEmployees}</p>
                <img src={company.logo_url} alt={`${company.name}`} />
                </div>
        }) : null;

    const search = async (searchTerm) => {
        let data = await JoblyApi.getCompany(searchTerm);
        setSpecificCompany(data);
        companyRender = specificCompany;
    }

    return (
        <div>           
            <SearchBar type='company' search={search}/>
            <br />
            {companyRender ? companyRender : <b>Loading...</b>}
        </div>
    );
}

export default Companies;