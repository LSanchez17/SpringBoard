/** processForm: get data from form and make AJAX call to our API. */

async function processForm(evt) {
    evt.preventDefault();

    let name = document.querySelector('#name').value;
    let year = document.querySelector('#year').value;
    let email = document.querySelector('#email').value;
    let color = document.querySelector('#color').value;

    console.log(name,year,email,color)

    postUserInfo = await axios.post('/api/get-lucky-num', {
        'name':name,
        'year':year,
        'email':email,
        'color':color
    })
    
    handleResponse(postUserInfo.data);
}

/** handleResponse: deal with response from our lucky-num API. */

function handleResponse(resp) {
    if(resp.error){
        $('#lucky-results').append(resp);
    }
    else{
        let formatting = `Your lucky number is ${resp.number.number}, fact: ${resp.number.fact},
                      Your birth year is ${resp.year.year}, fact: ${resp.year.fact},
                      Your name is ${resp.name}, your email is ${resp.email}, and your color is ${resp.color}`;

        $('#lucky-results').append(formatting)
    }
}

$("#lucky-form").on("submit", (e) => {
    processForm(e)
});
