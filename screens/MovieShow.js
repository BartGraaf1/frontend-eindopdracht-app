import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Platform } from "react-native";
import config from '../config';
import axios from "axios";

export default function MovieShow(props) {
  const [movie, setMovie] = useState({});
  const [countries, setCountries] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getMovie() {
      try {
        const options = {
          method: "GET",
          url: "https://unogsng.p.rapidapi.com/title",
          params: { netflixid: props.navigation.state.params.id },
          headers: {
            "x-rapidapi-key":  config.REACT_APP_UNOGSNG_API_KEY,
            "x-rapidapi-host": config.REACT_APP_UNOGSNG_API_HOST,
          },
        };

        axios
            .request(options)
            .then(function (response) {
              setMovie(response.data.results[0]);
              setLoading(false);
            })
            .catch(function (error) {
              console.error(error);
            });

        const optionsLangs = {
          method: "GET",
          url: "https://unogsng.p.rapidapi.com/titlecountries",
          params: { netflixid: props.navigation.state.params.id },
          headers: {
            "x-rapidapi-key": config.REACT_APP_UNOGSNG_API_KEY,
            "x-rapidapi-host": config.REACT_APP_UNOGSNG_API_HOST,
          },
        };

        axios
            .request(optionsLangs)
            .then(function (response) {
              let countries = response.data.results;
              countries = countries.map(country => {
                  return country.country.trim();
                }).join(', ');
              setCountries(countries);
              setLoading(false);
            })
            .catch(function (error) {
              console.error(error);
            });
      } catch (e) {
        console.log(e);
      }
    }
    getMovie();
  }, []);
  return (
      <SafeAreaView>
        <ScrollView>
          {!loading ? (
              <View style={styles.appContainer}>
                <View>
                  <Text style={styles.movieHeader}>{movie.title}</Text>
                </View>
                <View>
                  <Text>{unescape(movie.imdbplot)}</Text>
                </View>
                <View style={styles.displayTextInline}>
                  <Text style={styles.textH}>Rating: </Text>
                  <Text>{movie.imdbrating}</Text>
                </View>
                <View style={styles.displayTextInline}>
                  <Text style={styles.textH}>Runtime: </Text>
                  <Text>{movie.imdbruntime}</Text>
                </View>
                <View style={styles.displayTextInline}>
                  <Text style={styles.textH}>Type: </Text>
                  <Text>{movie.vtype}</Text>
                </View>
                <View style={styles.displayTextInline}>
                  <Text style={styles.textH}>Year : </Text>
                  <Text>{movie.year}</Text>
                </View>
                <View style={styles.displayTextInline}>
                  <Text style={styles.textH}>Genre: </Text>
                  <Text>{movie.imdbgenre}</Text>
                </View>
                <View style={styles.displayTextInline}>
                  <Text style={styles.textH}>Country: </Text>
                  <Text>{movie.imdbcountry}</Text>
                </View>
                <View style={styles.displayTextInline}>
                  <Text style={styles.textH}>Awards: </Text>
                  <Text>{movie.imdbawards}</Text>
                </View>
                <View style={styles.displayTextInline}>
                  <Text style={styles.textH}>Maturity: </Text>
                  <Text>{movie.matlabel}</Text>
                </View>
                {countries &&
                  <View style={styles.displayTextUnder}>
                    <Text style={styles.textH}>Available in the following countries: </Text>
                    <Text>{countries}</Text>
                  </View>
                }
              </View>
          ) : (
              <View style={styles.appContainer}>
                <Text>Loading....</Text>
              </View>
          )}
        </ScrollView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  movieHeader: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
  textH: {
    fontWeight: "bold",
  },
  displayTextInline: {
    paddingTop: 20,
    width: 350,
    flexDirection: "row",
    alignItems: "flex-start",
    height: Platform.OS === 'ios' ? 50 : 40
  },
  displayTextUnder: {
    paddingTop: 20
  }
});
