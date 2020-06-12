import YelpService from "./components/YelpService";

import Map from "./components/Map";
import React, {Component} from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
const deltas = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
};
export default class App extends Component {
  state = {
    region: null,
    coffeeShops: []
  };

  componentWillMount() {
    this.getLocationAsync();
  }

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied'
      });
    }
  /* ... */
    let location = await Location.getCurrentPositionAsync({});
    const region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      ...deltas
    };
    await this.setState({ region });
    await this.getCoffeeShops();
  }
  getCoffeeShops = async () => {
    const {latitude, longitude} = this.state.region;

    const userLocation = {latitude, longitude};
    const coffeeShops = await YelpService.getCoffeeShops(userLocation);
    this.setState({coffeeShops});
  };


  render() {
    const {region, coffeeShops} = this.state;
    return (
        <SafeAreaView style={styles.container}>
          <Map region={region} places={coffeeShops}/>
        </SafeAreaView>
    );
  }
}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
}
})
