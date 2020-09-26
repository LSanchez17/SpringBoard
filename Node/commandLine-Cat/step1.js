const fs = require('fs');

function cat (path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(err); 
        }
        console.log(data)
    })
}
//Runing process.argv is a list, first item is node, second is the file 
//executing the code itsef, third is your true parameter
cat(process.argv[2]);
