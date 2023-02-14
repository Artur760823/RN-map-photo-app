import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import {getCurrentPositionAsync, useForegroundPermissions, PermissionStatus} from 'expo-location';
import {Colors} from '../../constans/colors';
import OutlinedButton from '../UI/OutlinedButton';
import { getMapPreview, getAddress } from '../../util/location';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';


const LocationPicker = ({onPickLocation}) => {
    const [locationPremissionInformation, requestPremission] = useForegroundPermissions();
    const [pickedLocation, setPickedLocation] = useState();
    const isFocused = useIsFocused();

    const navigation = useNavigation()
    const route = useRoute();

   

    useEffect(()=>{
        if(isFocused && route.params){
            const mapPickedLocation = {lat: route.params.pickedLat, lng: route.params.pickedLng};
            setPickedLocation(mapPickedLocation);
        }
    }, [route, isFocused]);

    useEffect(()=>{

        async function handleLocation(){
            if(pickedLocation){
                const address = await getAddress(pickedLocation.lat, pickedLocation.lng);
                onPickLocation({...pickedLocation, address: address});
            }
        } 
        handleLocation();
    }, [pickedLocation, onPickLocation]);

    async function verifyPremissions(){
        if (locationPremissionInformation.status === PermissionStatus.UNDETERMINED){
            const permissionResponse = await requestPremission();
 
            return permissionResponse.granted;
         }
 
         if(locationPremissionInformation.status === PermissionStatus.DENIED){
             Alert.alert('Insufficient Premissions!', 'You need to grant location permissions to use this app!');
             return false;
         }
    }



    async function getLocation(){
        const hasPremission = await verifyPremissions();
        if(hasPremission){
            return;
        }
        const location = await getCurrentPositionAsync();
        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        });

        
    }

    let locationPreview = <Text>No location picked yet.</Text>

    if(pickedLocation){
        locationPreview = <Image style={styles.image} source={{uri: getMapPreview(pickedLocation.lat, pickedLocation.lng)}}/>;
    }

    function pickOnMapHandler(){
        navigation.navigate('Map');
    }
    return (
        <View>
            <View style={styles.mapPreview}>
              {locationPreview}
            </View>
            <View style={styles.actions}>
                <OutlinedButton icon="location" onPress={getLocation}>Locate User</OutlinedButton>
                <OutlinedButton icon="map" onPress={pickOnMapHandler}>Pick on Map</OutlinedButton>
            </View>
        </View>
  )
}

const styles = StyleSheet.create({
    mapPreview:{
        width: "100%",
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4
    },
    actions:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    image:{
        width: '100%',
        height: '100%',
        borderRadius: 4
    }
})

export default LocationPicker