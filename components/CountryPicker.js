import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {SearchContext} from '../contexts/SearchProvider.js';

const Item = Picker.Item;

export default function CountryPicker() {
  const {country, setCountryF} = useContext(SearchContext);

  return (
      <View style={styles.container}>
        <Picker
            selectedValue={country}
            onValueChange={(v) => setCountryF(v)}
            prompt="Pick a country to search in">
          <Item label='Netherlands ' value='67'/>
          <Item label='Argentina ' value='21'/>
          <Item label='Australia ' value='23'/>
          <Item label='Belgium ' value='26'/>
          <Item label='Brazil ' value='29'/>
          <Item label='Canada ' value='33'/>
          <Item label='Switzerland ' value='34'/>
          <Item label='Germany ' value='39'/>
          <Item label='France ' value='45'/>
          <Item label='United Kingdom' value='46'/>
          <Item label='Mexico ' value='65'/>
          <Item label='Sweden ' value='73'/>
          <Item label='United States' value='78'/>
          <Item label='Iceland ' value='265'/>
          <Item label='Japan ' value='267'/>
          <Item label='Portugal ' value='268'/>
          <Item label='Italy ' value='269'/>
          <Item label='Spain ' value='270'/>
          <Item label='Czech Republic ' value='307'/>
          <Item label='Greece ' value='327'/>
          <Item label='Hong Kong ' value='331'/>
          <Item label='Hungary ' value='334'/>
          <Item label='Israel ' value='336'/>
          <Item label='India ' value='337'/>
          <Item label='South Korea' value='348'/>
          <Item label='Lithuania ' value='357'/>
          <Item label='Poland ' value='392'/>
          <Item label='Romania ' value='400'/>
          <Item label='Russia' value='402'/>
          <Item label='Singapore ' value='408'/>
          <Item label='Slovakia ' value='412'/>
          <Item label='Thailand ' value='425'/>
          <Item label='Turkey ' value='432'/>
          <Item label='South Africa' value='447'/>
        </Picker>
      </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold'
  }
});
