import React, {useContext, useEffect, useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import {SearchContext, SearchProvider} from '../contexts/SearchProvider.js';

export default function MovieShow(props) {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function getMovie() {
      try {
        const options = {
          method: 'GET',
          url: 'https://unogsng.p.rapidapi.com/title',
          params: {netflixid: props.navigation.state.params.id},
          headers: {
            'x-rapidapi-key': '37ae6a10eamsh713bf3d65c41beap16e4cdjsna4b058e9b131',
            'x-rapidapi-host': 'unogsng.p.rapidapi.com'
          }
        };

        axios.request(options).then(function (response) {
          setMovie(response.data.results[0]);
        }).catch(function (error) {
          console.error(error);
        });

      } catch (e) {
        console.log(e);
      }
    }

    getMovie();
  }, []);
  return (
    <View style={styles.appContainer}>
      <Text>{movie.title}</Text>
      <Text>{movie.imdbplot}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
