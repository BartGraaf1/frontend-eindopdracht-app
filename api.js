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

export async function getMoviesApi(searchArray, page) {
  const limit = 20;
  let searchUsed = 0;
  let searchString = "";
  console.log(typeof  searchArray['type'])
  switch (searchArray['type']) {
    case "1":
      searchString = "https://unogsng.p.rapidapi.com/search";
      break;
    case "2":
      searchString = "https://unogsng.p.rapidapi.com/expiring";
      break;
    case "3":
      searchString = "https://unogsng.p.rapidapi.com/search";
      const date = new Date();
      const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
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
    console.log("Land: " +  searchArray['country']);
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
    searchUsed =+ 1;
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
  return result.data;
}
