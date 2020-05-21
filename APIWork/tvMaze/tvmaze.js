/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */
/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *      will be returning a promise.
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */

 async function searchShows(query) {
  // TODO: Make an ajax request to the searchShows api.
  const missingImage = 'https://tinyurl.com/tv-missing';
  const res = await axios.get('http://api.tvmaze.com/search/shows', {params: {q:query}});
  let arrShow = res.data.map(items => {
    let itemdata = items.show;
    return {
      id: itemdata.id,
      name: itemdata.name,
      summary: itemdata.summary,
      image: itemdata.image ? itemdata.image.medium : missingImage
    }
  })
  return arrShow;
}

/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */
function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();
  let epButtonNumber = 0;

  for (let show of shows) { 
    epButtonNumber++;
    let $item = $(
      `<div id='show${epButtonNumber}' class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
         <img class="card-img-top img-thumbnail" src="${show.image}">
           <div class="card-body">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
             <button id="${epButtonNumber}" class='btn btn-warning'>Show Episodes</button> 
            </div>
         </div>
       </div>
      `);
    $showsList.append($item);
    addClickListener(epButtonNumber);
  }
}

function addClickListener(identifier) {
  let $episodeClicker = $(`#${identifier}`);
  $episodeClicker.on('click', async function() {
      //selects dataset attributes of this show
      let showId = document.querySelector(`#show${identifier}`);
      //console.log(showId.dataset.showId);
      let episodesArr = await getEpisodes(showId.dataset.showId);
      populateEpisodes(episodesArr);
    })
}

function populateEpisodes(arrEpisodes){
  let $populateHere = $('#episodes-list');
  $populateHere.empty();

  for(let ep of arrEpisodes){
    let $episodes = $(
      `<li>
        ${ep.name} 
        (Season: ${ep.season}, Episode: ${ep.number})
       </li>`
    );
    $populateHere.append($episodes);
  }

  $("#episodes-area").show();
}

/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */
$("#search-form").on("submit", async function handleSearch (evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();

  let shows = await searchShows(query);

  populateShows(shows);
});


  /** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */
async function getEpisodes(id) {
  const res = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`)
  let episodeArr = res.data.map(episode => {
    return{
      id: episode.id,
      name: episode.name,
      season: episode.season,
      number: episode.number
    }
  })
  return episodeArr;
}
