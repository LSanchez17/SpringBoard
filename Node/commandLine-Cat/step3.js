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
        return console.log('error');
    }
    else{
        return console.log(`URL Content:${content.data}`)
    }
}

// webCat(process.argv[2]);

async function megaCat(direction, isOut = false, fileWrite = false, originalLocation = false) {
    if(isOut){
        if(originalLocation.includes('.txt')){
            fs.writeFile(fileWrite, originalLocation, function(err) {
                if(err){
                    return console.log(err);
                }
                console.log(`File has been saved to ${fileWrite} from ${originalLocation}`);
                cat(fileWrite);
            });
        }
        else{
            let content = await axios.get(originalLocation);
            fs.writeFile(fileWrite, content.data, function(err) {
                if(err){
                    return console.log(err);
                }
                console.log(`File has been saved to ${fileWrite} from ${content}`);
            });
        }
    }
    else{
        if(direction.includes('.txt')){
            fs.readFile(direction, 'utf8', (err, data) => {
                if (err) {
                    console.log(err);
                }
                console.log(`File contains: ${data}`);
            })
        }
        else{
            webCat(direction);
        }
    }
}

megaCat(process.argv[2], process.argv[3], process.argv[4], process.argv[5])