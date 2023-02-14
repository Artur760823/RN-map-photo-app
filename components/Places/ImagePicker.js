import React, {useState} from 'react';
import { View, Button, Alert, Image, Text, StyleSheet } from 'react-native';
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';
import {Colors} from '../../constans/colors';
import OutlinedButton from '../UI/OutlinedButton';

const ImagePicker = ({onTakeImage}) => {

    const [pickedImage, setPickedImage] = useState();

    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

    async function verifyPermission(){
        if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED){
           const permissionResponse = await requestPermission();

           return permissionResponse.granted;
        }

        if(cameraPermissionInformation.status === PermissionStatus.DENIED){
            Alert.alert('Insufficient Premissions!', 'You need to grant camera permissions to use this app!');
            return false;
        }
    }

    async function takeImgeHandler(){
        const hasPremission = await verifyPermission();

        // if(!hasPremission){
        //     return;
        // }
        const image =  await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        });
        setPickedImage(image.assets[0].uri);
        onTakeImage(image.assets[0].uri);
    }

    let imagePreview = <Text style={styles.imagePreview}>No image taken yet.</Text>;

    if(pickedImage){
        imagePreview = <Image style={styles.image} source={{uri: pickedImage}} />;
    }

    return (
        <View>
            <View style={styles.imagePreview}>
                {imagePreview}
            </View>
            <OutlinedButton icon="camera" onPress={takeImgeHandler}>Take image</OutlinedButton>
        </View>
    )
}

const styles = StyleSheet.create({
    imagePreview: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: 18
    },
    imagePreview: {
        width: "100%",
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 4
    }
})

export default ImagePicker