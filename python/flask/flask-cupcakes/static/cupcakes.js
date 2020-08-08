class APIForm {
    constructor(){
        this.getIndividualCupcake = document.querySelector('#singleCupcake');
        this.getAllCupcakes = document.querySelector('#allCupcakes');
        this.AddNewCupcakes = document.querySelector('#postCupcake');
        this.cupcakeListHolder = document.querySelector('#cupcakeList');
    }

    async getAll() {
        let data = await axios.get('/api/cupcakes');
        return data.data;
    }

    async getOneCupcake(cupcakeId){
        let data = await axios.get(`/api/cupcakes/${cupcakeId}`);
        console.log(data.data)
        return data.data;
    }

    async submitCupcake(flavor, rating, size, image){
        let dataPost = await axios.post('/api/cupcakes',
            {
                flavor,
                rating,
                size,
                image
            }
        )
        console.log(dataPost);
        return dataPost;
    }
}


window.addEventListener('load', (e) => {
    // console.log(e, 'loaded')
    let formControl = new APIForm();

    //Gets all cupcakes
    formControl.getAllCupcakes.addEventListener('submit', async (e) => {
        e.preventDefault();

        let cupcakeList = await formControl.getAll();

        console.log(cupcakeList.cupcakes);

        for(let i = 0; i < cupcakeList.cupcakes.length; i++){
            let listItem = document.createElement('li');
            let flavorText = document.createElement('p');
            let ratingText = document.createElement('p');
            let sizeText = document.createElement('p');
            let image = document.createElement('img');

            flavorText.innerText = `Flavor: ${cupcakeList.cupcakes[i].flavor}`;
            ratingText.innerText = `Rating: ${cupcakeList.cupcakes[i].rating}`;
            sizeText.innerText = `Size: ${cupcakeList.cupcakes[i].size}`;
            image.src = cupcakeList.cupcakes[i].image;
            image.style.width = '150px';
            image.style.height = '150px';

            listItem.append(flavorText,ratingText,sizeText,image);

            formControl.cupcakeListHolder.append(listItem);
        }
    })

    //Gets individual cupcake
    formControl.getIndividualCupcake.addEventListener('submit', async (e) => {
        e.preventDefault();
        let whichCupcake = document.querySelector('#ckId').value;
        let singleCupcake = await formControl.getOneCupcake(whichCupcake);

        console.log(singleCupcake);

        let listItem = document.createElement('li');
        let flavorText = document.createElement('p');
        let ratingText = document.createElement('p');
        let sizeText = document.createElement('p');
        let image = document.createElement('img');

        flavorText.innerText = `Flavor: ${singleCupcake.cupcake.flavor}`;
        ratingText.innerText = `Rating: ${singleCupcake.cupcake.rating}`;
        sizeText.innerText = `Size: ${singleCupcake.cupcake.size}`;
        image.src = singleCupcake.cupcake.image;
        image.style.width = '150px';
        image.style.height = '150px';

        listItem.append(flavorText,ratingText,sizeText,image);

        formControl.cupcakeListHolder.append(listItem);
    })

    //Posts new cupcake
    formControl.AddNewCupcakes.addEventListener('submit', async (e) => {
        e.preventDefault();

        let flavor = document.querySelector('#ckFlavor').value;
        let rating = document.querySelector('#ckRating').value;
        let size = document.querySelector('#ckSize').value;
        let imageURL = document.querySelector('#ckImage').value;

        newCupcake = formControl.submitCupcake(flavor,rating,size,imageURL);
        // console.log(newCupcake);

        let listItem = document.createElement('li');
        let flavorText = document.createElement('p');
        let ratingText = document.createElement('p');
        let sizeText = document.createElement('p');
        let image = document.createElement('img');

        flavorText.innerText = `Flavor: ${flavor}`;
        ratingText.innerText = `Rating: ${rating}`;
        sizeText.innerText = `Size: ${size}`;
        image.src = `${imageURL}`;
        image.style.width = '150px';
        image.style.height = '150px';

        listItem.append(flavorText, ratingText, sizeText, image);

        formControl.cupcakeListHolder.append(listItem);

    })

})
