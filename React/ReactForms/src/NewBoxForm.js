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
                <label htmlFor='Box Color'>Box Color</label>
                <input type='text' name='color' onChange={handleBoxChanges} value={formData.color}/>

                <label htmlFor='Box Width'>Box Width</label>
                <input type='text' name='width' onChange={handleBoxChanges} value={formData.width}/>
                
                <label htmlFor='Box Height'>Box Height</label>
                <input type='text' name='height' onChange={handleBoxChanges} value={formData.height}/>
                
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default NewBoxForm;
