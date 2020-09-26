const fs = require('fs');
const axios = require('axios');

function cat (path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(err); 
        }
        console.log(`File contents: ${data}`)
    })
}
//Runing process.argv is a list, first item is node, second is the file 
//executing the code itsef, third is your true parameter
// cat(process.argv[2]);

async function webCat(URL) {
    let content = await axios.get(URL);
    if(!content){
        console.log('error');
    }
    else{
        console.log(`URL Content:${content.data}`)
    }
}

webCat(process.argv[2]);