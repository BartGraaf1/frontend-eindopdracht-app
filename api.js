import axios from 'axios';

function addToSearchString(initialString, newString, count){
  let finalString = initialString;
  let finalAdd = "";
  if(count > 0){
    finalAdd = "&";
  }else{
    finalAdd = "?";
  }
  finalString += finalAdd + newString;
  return finalString;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


export async function getMoviesApi(searchArray, page) {
  const limit = 20;
  let searchUsed = 0;
  let searchString = "";
  const date = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  switch (searchArray['type']) {
    case "1":
      searchString = "https://unogsng.p.rapidapi.com/search";
      break;
    case "2":
      searchString = "https://unogsng.p.rapidapi.com/expiring";
      break;
    case "3":
      searchString = "https://unogsng.p.rapidapi.com/search";
      searchAdd = "newdate=" + firstDay;
      searchString = addToSearchString(searchString, searchAdd, searchUsed);
      searchUsed =+ 1;
      break;
    default:
      searchString = "https://unogsng.p.rapidapi.com/search";
  }
  let searchAdd = "";
  if (searchArray['country'] > 0) {
    searchAdd = "countrylist=" + searchArray['country'];
    searchString = addToSearchString(searchString, searchAdd, searchUsed);
    searchUsed =+ 1;
  }
  if (searchArray['query'] !== undefined) {
    searchAdd = "query=" + searchArray['query'].trim();
    searchString = addToSearchString(searchString, searchAdd, searchUsed);
    searchUsed =+ 1;
  }
  if (page !== undefined) {
    const offsetSearch = limit * page;
    searchAdd = "offset=" + offsetSearch;
    searchString = addToSearchString(searchString, searchAdd, searchUsed);
  }

  searchAdd = "&limit=" + limit;
  searchString += searchAdd;
  const result = await axios.get(
      searchString,
      {
        headers: {
          "x-rapidapi-host": "unogsng.p.rapidapi.com",
          "x-rapidapi-key":
              "37ae6a10eamsh713bf3d65c41beap16e4cdjsna4b058e9b131",
        },
      }
  );
  if(result.data.results !== undefined){
    result.data.results.map(movie => {
      if(searchArray['type'] === "2"){
        if(movie.netflixid !== undefined && movie.netflixid !== null){
          movie.nfid = movie.netflixid;
        }
      }
      movie.uid = getRandomInt(100000) + movie.nfid;
      return movie;
    })
  }
  return result.data;
}
