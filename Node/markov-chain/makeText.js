/** Command-line tool to generate Markov text. */
const fs = require('fs');
const axios = require('axios');
const  markov = require('./markov');
const { mainModule } = require('process');


function iMakeChains(text){
    let markovianMachine = new markov.MarkovMachine(text);
    console.log(markovianMachine.makeText())
}
function files(doc){
    fs.readFile(doc, 'utf8', (err, data) => {
        if(err){
            console.log(err);
        }
        iMakeChains(data);
    })
}

async function URL(url){
    let content = await axios.get(url);
    if(!content){
        console.log('Error processing request');
    }
    else{
        iMakeChains(content.data);
    }
}

function whichFunctino(types, data){
    if(type === 'file'){
        files(data);
    }
    else{
        URL(data);
    }
}

let [type, data] = process.argv.slice(2);

whichFunctino(type, data)