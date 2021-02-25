import React, { useEffect, useState } from 'react';
import JoblyApi from './helpers/backEndAPI';
import {useParams} from 'react-router-dom';

const Company = ({name = '', description = '', numEmployees = '', imageURL = ''}) => {
    let [companyData, setCompanyData] = useState();

    let companyHandle = useParams().companyName;
    console.log(companyHandle)
        
    useEffect( () => {
        const getOneCompany = async () => {
            let data = await JoblyApi.getCompany(companyHandle);
            console.log(data)
            setCompanyData(data);
        }
        
        
        getOneCompany();
        }, []);

    if(!name){
        return (
            <div>
                <h3>{companyData.name}</h3>
                <p>{companyData.description}</p>
                <small>{companyData.numEmployees} Employees</small>
                <br />
                <img src={companyData.imageURL} alt={`${companyData.name} company`}></img>
            </div>
        )
    }
    else{
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
}

export default Company;