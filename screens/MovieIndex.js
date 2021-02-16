import React, {useState, useEffect, useContext} from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Button,
  TextInput,
} from 'react-native';
import axios from 'axios';
import { useForm, Controller } from "react-hook-form";
import MovieListItem from '../components/MovieListItem';
import CountryPicker from '../components/CountryPicker';
import TypePicker from '../components/TypePicker';
import {SearchContext, SearchProvider} from '../contexts/SearchProvider.js';

export default function MovieIndex({ navigation }) {
const [movies, setMovies] = useState([]);
  const {country, type, query, setQueryF} = useContext(SearchContext);
  const { control, handleSubmit, errors } = useForm();
  const onSubmit = data => formSubmit(data);

  function formSubmit(data, e) {
    setQueryF(data.query);
    e.preventDefault();
  }

  useEffect(() => {
    async function getMovies() {
      try {
          const options = {
            method: 'GET',
            url: 'https://unogsng.p.rapidapi.com/search',
            params: {
              start_year: '1972',
              orderby: 'rating',
              audiosubtitle_andor: 'and',
              limit: '100',
              subtitle: 'english',
              countrylist: '78,46',
              audio: 'english',
              country_andorunique: 'unique',
              offset: '0',
              end_year: '2019'
            },
            headers: {
              'x-rapidapi-key': '37ae6a10eamsh713bf3d65c41beap16e4cdjsna4b058e9b131',
              'x-rapidapi-host': 'unogsng.p.rapidapi.com'
            }
          };

          axios.request(options).then(function (response) {
            setMovies(response.data.results);
          }).catch(function (error) {
            console.error(error);
          });
      } catch (e) {
        console.log(e);
      }
    }

    getMovies();
  }, []);

  function goToMovie(id) {
    // het tweede argument van navigate moet een object zijn
    // deze wordt in het scherm beschikbaar onder props.route.params
    // de key die je hier zet kan je gebruiken om uit te lezen, dus in dit geval:
    // props.route.params.id
    navigation.navigate('MovieShow', { id: id });
  }


  return (
    <View>
      <SafeAreaView style={styles.main}>
        <View>
          <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                  <TextInput
                      placeholder="Query"
                      style={styles.input}
                      onBlur={onBlur}
                      onChangeText={value => onChange(value)}
                      value={value}
                  />
              )}
              name="query"
              defaultValue=""
          />
          <ScrollView>
            <CountryPicker />
          </ScrollView>
          <ScrollView>
            <TypePicker />
          </ScrollView>
          <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
      </SafeAreaView>
      <FlatList
        data={movies}
        renderItem={({ item }) => {
          return (
            <MovieListItem item={item} onPress={() => goToMovie(item.nfid)} />
          );
        }}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => {
          return <View style={styles.itemSeparator} />;
        }}
        onEndReachedThreshold={0.9}
        onEndReached={getMovies}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemSeparator: {
    borderBottomColor: 'blue',
    borderWidth: 2,
  },
  input:{
    backgroundColor: 'white',
    margin: 10,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    padding: 5,
  },
  heading: {
    marginLeft: 8,
    fontSize: 20,
    fontWeight: 'bold',
  }
});
