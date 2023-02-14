import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import OutlinedButton from '../components/UI/OutlinedButton';
import { Colors } from '../constans/colors';
import { fetchPlaceDetails } from '../util/database';

const PlaceDetails = ({route, navigation}) => {

    const [fetchPlace, setFetchPlace] = useState();

    function showOnMapHandler(){
        navigation.navigate('Map', {
            initialLat: fetchPlace.location.lat,
            initialLng: fetchPlace.location.lng
        });
    }

    const selectedPlaceId = route.params.placeId;
    useEffect(()=>{
        async function loadPlaceData(){
            const place = await fetchPlaceDetails(selectedPlaceId);
            setFetchPlace(place);
            navigation.setOptions({
                title: place.title,
            })
        }

        loadPlaceData();
    }, [selectedPlaceId]);

    if(!fetchPlace){
        return <View style={styles.fallback}><Text>Loading place data...</Text></View>
    }

    return (
        <ScrollView>
            <Image style={styles.image} source={{uri: fetchPlace.imageUri}}/>
            <View style={styles.locationContainer}>
                <View style={styles.addressContainer}>
                    <Text style={styles.address} >{fetchPlace.address}</Text>
                </View>
                <OutlinedButton icon="map" onPress={showOnMapHandler}>View on Map</OutlinedButton>
            </View>
        </ScrollView>
  )
}

const styles = StyleSheet.create({
    fallback:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image:{
        height: '35%',
        minHeight: 300,
        width: '100%'
    },
    locationContainer:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    addressContainer:{
        padding: 20
    },
    address:{
        color: Colors.primary500,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16
    }
})

export default PlaceDetails