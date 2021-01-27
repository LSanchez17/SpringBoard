// add whatever parameters you deem necessary
function twoArrayObject(keys, values) {
    let myObj = {};
    for(let i=0; i<keys.length; i++){
        if(values[i]){ 
            myObj[keys[i]] = values[i]
        }
        else{
            myObj[keys[i]] = null;
        }
    }
    return myObj;
}
