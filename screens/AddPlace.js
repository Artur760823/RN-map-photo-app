import React from 'react';
import { View, StyleSheet } from 'react-native';
import PlaceForm from '../components/Places/PlaceForm';
import { insertPlace } from '../util/database';

const AddPlace = ({navigation}) => {

  async function createPlaceHandler(place){
    await insertPlace(place);
    navigation.navigate('AllPlaces')
  }

  return (
    <View style={styles.rootContainer}>
      <PlaceForm onCreatePlace={createPlaceHandler}/>
    </View>

  )
}

const styles = StyleSheet.create({
  rootContainer:{
    flex:1,
    marginBottom: 10
  }
})

export default AddPlace