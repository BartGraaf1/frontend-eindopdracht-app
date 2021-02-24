import React, {useState, useEffect, useContext} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  Button,
  TextInput,
} from 'react-native';
import { useForm, Controller } from "react-hook-form";
import MovieListItem from '../components/MovieListItem';
import CountryPicker from '../components/CountryPicker';
import TypePicker from '../components/TypePicker';
import {SearchContext} from '../contexts/SearchProvider.js';
import {getMoviesApi} from '../api';

export default function MovieIndex({ navigation }) {
  const [movies, setMovies] = useState([]);
  const {country, type, query, setQueryF} = useContext(SearchContext);
  const [typeCurr, setTypeCurr] = useState(1);
  const { control, handleSubmit, errors } = useForm();
  const [page, setPage] = useState(0);
  const [callSearch, setCallSearch] = useState(0);
  const [loading, setLoading] = useState(false);
  const onSubmit = data => formSubmit(data);


  useEffect(() => {
    const fetchMovies = async (thePage) => {
      setLoading(true);
      const searchArray = [];
      if(country !== undefined){
        searchArray['country'] = country;
      }
      if(type !== undefined){
        searchArray['type'] = type;
      }
      if(query !== undefined){
        searchArray['query'] = query;
      }
      const response = await getMoviesApi(searchArray, thePage);
      let arrHolder = movies;
      if(page>0){
        Array.prototype.push.apply(arrHolder,response.results);
      }else{
        arrHolder = response.results;
      }

      setMovies(arrHolder);
      setLoading(false);

    };
      fetchMovies(page);
  }, [page, callSearch]);

  const handleLoadmore = () => {
    if(!loading){
      setPage(page + 1);
    }
  };


  function formSubmit(data) {
    setQueryF(data.query);
    setCallSearch(callSearch+1);
    setPage(0);
    setTypeCurr(type);
  }

  function goToMovie(id) {
    navigation.navigate('MovieShow', { id: id });
  }


  return (
    <View>
      <SafeAreaView style={styles.main}>
        <View>
          {!(parseInt(typeCurr) === 2) &&
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
          }
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
            <MovieListItem type={typeCurr} item={item} onPress={() => goToMovie(item.nfid)} />
          );
        }}
        keyExtractor={(item) => item.uid.toString()}
        ItemSeparatorComponent={() => {
          return <View style={styles.itemSeparator} />;
        }}
        onEndReachedThreshold={0.9}
        onEndReached={handleLoadmore}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemSeparator: {
    borderBottomColor: 'black',
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
