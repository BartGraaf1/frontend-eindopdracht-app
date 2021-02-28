import axios from 'axios';
import config from './config';

function formatDate(date) {
  let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}

function rawurlencode (str) {
  return encodeURIComponent(str)
      .replace(/!/g, '%21')
      .replace(/'/g, '%27')
      .replace(/\(/g, '%28')
      .replace(/\)/g, '%29')
      .replace(/\*/g, '%2A')
}


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
  const firstDay = formatDate(new Date(date.getFullYear(), date.getMonth(), 1));
  const typeR = parseInt(searchArray['type']);
  switch (typeR) {
    case 1:
      searchString = "https://unogsng.p.rapidapi.com/search";
      searchAdd = "orderby=rating";
      searchString = addToSearchString(searchString, searchAdd, searchUsed);
      searchUsed =+ 1;
      break;
    case 2:
      searchString = "https://unogsng.p.rapidapi.com/expiring";
      break;
    case 3:
      searchString = "https://unogsng.p.rapidapi.com/search";
      searchAdd = "newdate=" + firstDay;
      searchString = addToSearchString(searchString, searchAdd, searchUsed);
      searchUsed =+ 1;
      break;
    default:
      searchString = "https://unogsng.p.rapidapi.com/search";
      searchAdd = "orderby=rating";
      searchString = addToSearchString(searchString, searchAdd, searchUsed);
      searchUsed =+ 1;
  }
  let searchAdd = "";
  if (searchArray['country'] > 0) {
    searchAdd = "countrylist=" + searchArray['country'];
    searchString = addToSearchString(searchString, searchAdd, searchUsed);
    searchUsed =+ 1;
  }
  if (searchArray['query'] !== undefined) {
    searchAdd = "query=" + rawurlencode(searchArray['query'].trim());
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
          "x-rapidapi-host": config.REACT_APP_UNOGSNG_API_HOST,
          "x-rapidapi-key":  config.REACT_APP_UNOGSNG_API_KEY,
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
