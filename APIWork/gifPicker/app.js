/*
  Goal of App: Allow user to search for  GIF, and when the form
  is submitted, make a API request and return One GIF.  Append this GIF
  to the page.  User can add as many as they want.  User can remove them 
  all at once if desired.
*/
const APIKey = '49XxRvBMOQF7nANy7umXtPOcLcveHHr7';
const userSearchTerm = document.querySelector('#userGIF');
const GifArea = document.querySelector('#GIFZone')
const submitSearch = document.querySelector('#gifSearch');

submitSearch.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(userSearchTerm.value)
  gifFunc(APIKey, userSearchTerm.value);
  userSearchTerm.value = '';
})

const deleteAll = document.querySelector('#deleteAll');
deleteAll.addEventListener('click', (e) => {
  deleteFunc();
})

async function gifFunc(GifKey, term) {
  const res = await axios.get(`http://api.giphy.com/v1/gifs/search`, { params: {q: term, api_key: GifKey}});
  console.log(res.data);
  //logs an array of 25 items, already parsed by axios
  appendsGif(res.data);
  return;
}

const appendsGif = (response) =>{
  //create dom elements to be appended
  let randoGif = Math.floor(Math.random() * response.data.length);
  let newGif = document.createElement('div');
  let newGifImg = document.createElement('img');
  let gifSrc = response.data[randoGif].images.original.url;
  
  //add properties to those dom elements
  newGif.className = 'col-sm-auto';
  newGif.id = 'AddedGif';
  newGifImg.src = gifSrc;

  newGif.append(newGifImg);
  GifArea.append(newGif);
}


const deleteFunc = () =>{
  //Deleteall GIFS
  let gifsToDelete = document.querySelectorAll('#AddedGif');
  for(let i = 0; i <  gifsToDelete.length; i++){
    GifArea.removeChild(gifsToDelete[i]);
  }  
}

