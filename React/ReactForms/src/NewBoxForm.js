import {useState, useEffect} from 'react'
import './App.css';
import {v4 as uuid} from "uuid";

/*
* Form for adding new boxes to App.js
* Clear input values after submission
* Pass down to Box component props of color, height, width, delete()
* We set initial state to empty properties that we check for
* we match the key to the form input name property, to help fill in objects value
*/

const NewBoxForm = ({addBox}) => {
    const INITSTATE = {
        color: '',
        width: '',
        height: ''
    }
    const [formData, setData] = useState(INITSTATE);

    const handleBoxChanges = (evt) => {
        const {name, value} = evt.target;
        // console.log(evt)
        setData({
            ...formData, [name]: value
        })
        // console.log(formData)
    }

    const submitForm = (evt) => {
        evt.preventDefault();
        //from parent, add fn
        addBox({...formData, id: uuid()});
        console.log(formData)
        setData(INITSTATE);
    }    

    return (
        <div>
            <form onSubmit={submitForm}>
                <label htmlFor='BoxColor'>Box Color</label>
                <input type='text' name='color' id='BoxColor' onChange={handleBoxChanges} value={formData.color}/>

                <label htmlFor='BoxWidth'>Box Width</label>
                <input type='text' name='width' id='BoxWidth' onChange={handleBoxChanges} value={formData.width}/>
                
                <label htmlFor='BoxHeight'>Box Height</label>
                <input type='text' name='height' id='BoxHeight' onChange={handleBoxChanges} value={formData.height}/>
                
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default NewBoxForm;
