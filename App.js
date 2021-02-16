import 'react-native-gesture-handler';
import * as React from 'react';

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import MovieIndex from './screens/MovieIndex';
import MovieShow from './screens/MovieShow';
import { SearchProvider } from './contexts/SearchProvider';

const AppStack = createStackNavigator({
    MovieIndex: {
        screen: MovieIndex,
        navigationOptions: () => ({
            title: 'Search movies',
        })
    },
    MovieShow: {
        screen: MovieShow,
        navigationOptions: () => ({
            title: 'Movies Show',
        })
    },
});

const AppContainer = createAppContainer(AppStack);

const App = () => {
    return (
        <SearchProvider>
            <AppContainer />
        </SearchProvider>
    );
}
export default App;
