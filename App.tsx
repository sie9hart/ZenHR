/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React,{ Component } from 'react';

 import { Alert, StyleSheet, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
 
import { ActivityIndicator, FlatList } from 'react-native';
import SplashScreen from 'react-native-splash-screen'
export default class App extends Component {
	public state: any;
	public setState: any;
	public data: any;
	public isLoading: any;

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true
    };
  }

  async getMovies() {
    try {
      const response = await fetch('https://reactnative.dev/movies.json');
      const json = await response.json();
      this.setState({ data: json.movies });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentDidMount() {
    this.getMovies();
    SplashScreen.hide();

  }

  render() {
    const { data, isLoading } = this.state;

    return (
      <View style={{ flex: 1, padding: 24 }}>
        {isLoading ? <ActivityIndicator/> : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <Text>{item.title}, {item.releaseYear}</Text>
            )}
          />
        )}
      </View>
    );
  }
};
 const styles = StyleSheet.create({
 
   MainContainer: {
     flex: 1,
   },
 
   text: {
     fontSize: 24,
     color: 'black',
     textAlign: 'left',
     paddingLeft: 10,
     paddingTop: 5
   }
 
 });