import { StatusBar } from 'expo-status-bar';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import logo from './assets/logo.png';
import { MaterialIons } from '@expo/vector-icons';
import * as imagePicker from "expo-image-picker";
import { useState } from 'react';
import * as share from "expo-sharing";
import * as imageManipulator from "expo-image-manipulator";

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  function handleImagePicker() {
    imagePicker.launchImageLibraryAsync()
      .then((image) => {
        setSelectedImage({ uri: image.uri })
        console.log(selectedImage.uri)
      })
      .catch((error) => console.error(error))
  }

  function handleSharing() {
    if (Platform.OS == "web") {
      alert("uh oh your platform dont allow you to share");
      return;
    }


    imageManipulator.manipulateAsync(selectedImage.uri)
      .then((imageManipulated) => {
        // share.shareAsync(imageManipulated);
        share.shareAsync(imageManipulated.uri);
      })
      .catch((error) => console.error(error))
  }

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image
          source={selectedImage}
          style={styles.image}
        />

        <TouchableOpacity onPress={handleSharing} style={styles.button}>
          <Text style={styles.buttonText}>Share this image</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { setSelectedImage(null) }} style={styles.button}>
          <Text style={styles.buttonText}>Go back</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.image} />
      <Text style={styles.instruction}>To share a photo from your phone with a friend just click on the button bellow</Text>

      <TouchableOpacity
        onPress={handleImagePicker}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Pick an image</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 305,
    height: 159,
    marginBottom: 10,
  },
  instruction: {
    color: "#888",
    fontSize: 18,
    marginHorizontal: 15,
    marginVertical: 10,
  },
  button: {
    marginVertical: 10,
    backgroundColor: "blue",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
  },
  image: {
    width: 305,
    height: 159,
  }
});
