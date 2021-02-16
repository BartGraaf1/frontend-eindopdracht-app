import React, { useState, useEffect } from 'react';
import {Controller, useForm} from "react-hook-form";
import ModalDropdown from 'react-native-modal-dropdown';
import { Text, View, TextInput, Button, Alert, FlatList, StyleSheet } from "react-native";
import axios from 'axios';
import MovieListItem from '../components/MovieListItem';
export default function MovieIndex({ navigation }) {
  const [movies, setMovies] = useState([]);
  const { control, handleSubmit, errors } = useForm();
  const onSubmit = data => console.log(data);

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

    const DEMO_OPTIONS_2 = [
        {"name": "Rex", "age": 30},
        {"name": "Mary", "age": 25},
        {"name": "John", "age": 41},
        {"name": "Jim", "age": 22},
        {"name": "Susan", "age": 52},
        {"name": "Brent", "age": 33},
        {"name": "Alex", "age": 16},
        {"name": "Ian", "age": 20},
        {"name": "Phil", "age": 24},
    ];

  return (
    <View>
      <View>
        <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
                <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                />
            )}
            name="firstName"
            rules={{ required: true }}
            defaultValue=""
        />
        {errors.firstName && <Text>This is required.</Text>}

        <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
                <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                />
            )}
            name="lastName"
            defaultValue=""
        />
          <ModalDropdown ref="dropdown_2"
                         style={styles.dropdown_2}
                         textStyle={styles.dropdown_2_text}
                         dropdownStyle={styles.dropdown_2_dropdown}
                         options={DEMO_OPTIONS_2}
                         renderButtonText={(rowData) => this._dropdown_2_renderButtonText(rowData)}
                         renderRow={this._dropdown_2_renderRow.bind(this)}
                         renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => this._dropdown_2_renderSeparator(sectionID, rowID, adjacentRowHighlighted)}
          />
        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </View>
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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemSeparator: {
    borderBottomColor: 'blue',
    borderWidth: 2,
  },
});
