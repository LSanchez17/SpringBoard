import React, { useEffect, useState } from 'react';
import Company from './Company';
import JoblyApi from './helpers/backEndAPI';
import {Link} from 'react-router-dom';

const Companies = () => {
    //make a call to apiHelper
    //render the companies as individual props with their own link
    let [listCompanies, setListCompanies] = useState([]);

    useEffect( () => {
        const getAllCompanies = async () => {
            let data = await JoblyApi.getAllCompanies();
            setListCompanies(data);
            console.log(listCompanies)
        }

        getAllCompanies();
    }, []);

    let companyRender = listCompanies.length > 0 ? listCompanies.map(company => {
        return <div>
                <Link to={`/companies/${company.handle}`}>{company.name}</Link>
                <Company key={company.handle} 
                        name={company.name}
                        description={company.description}
                        numEmployees={company.numEmployees}
                        imageURL={company.imageURL} />
                </div>
        }) : null;

    return (
        <div>
            {companyRender ? companyRender : <b>Loading...</b>}
        </div>
    );
}

export default Companies;