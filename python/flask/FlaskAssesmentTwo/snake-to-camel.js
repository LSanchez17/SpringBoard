function snakeToCamel(str){
    arrStr = str.split('')
    // console.log(arrStr)
    for(let i=0; i<arrStr.length; i++){
        // console.log(arrStr[i])
        if(arrStr[i] === '_'){
            // console.log(arrStr[i])
            if(arrStr[i+1] !== undefined){
                arrStr[i+1] = arrStr[i+1].toUpperCase()
            }
            arrStr.splice(i,1)
        }
    }
    arrStr = arrStr.join('')
    // console.log(arrStr)
    return arrStr
}

