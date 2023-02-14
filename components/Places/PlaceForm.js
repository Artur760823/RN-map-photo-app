import React, {useCallback, useState} from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native';
import {Colors} from '../../constans/colors';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import Button from '../UI/Button';
import { Place } from '../../model/place';

const PlaceForm = ({onCreatePlace}) => {

  const [enteredTitle, setEnteredTitle] = useState('');
  const [pickedLocation, setpickedLocation] = useState();
  const [selectedImage, setSelectedImage] = useState();

  function changeTitleHandler(enteredText){
    setEnteredTitle(enteredText);
  }

  function takeImageHandler(imageUri){
    setSelectedImage(imageUri);
  }

  const pickLocationHandler = useCallback((location)=>{
    setpickedLocation(location);
  },[]);

  function savePlaceHandler(){
    const placeData = new Place(enteredTitle, selectedImage, pickedLocation);
    onCreatePlace(placeData);
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} onChangeText={changeTitleHandler} value={enteredTitle}/>
      </View>
      <ImagePicker onTakeImage={takeImageHandler}/>
      <LocationPicker onPickLocation={pickLocationHandler}/>
      <Button onPress={savePlaceHandler} >Add Place</Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  form:{
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 4
  },
  label:{
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.primary500
  },
  input:{
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    backgroundColor: Colors.primary100
  }
})

export default PlaceForm