import React from 'react'
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import Connexion from './Connexion'

export default function GetStartedButton({ navigation }) {
  const navigateToConnexion = () => {
    navigation.navigate('Connexion')
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/imeuble.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <TouchableOpacity style={styles.button} onPress={navigateToConnexion}>
  
        <Text style={styles.buttonText}>Get Started</Text>
        <Feather name="arrow-right-circle" size={35} color="white" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Text: {
    width: '100%',
    alignItems: 'center',
    color: 'white',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  button: {
    flexDirection: 'row',

    backgroundColor: 'rgba(0, 0, 1, 0.75)',

    paddingVertical: 20,
    paddingHorizontal: 60,
    borderWidth: 2,
    borderColor: 'grey',
    borderRadius: 8,
    paddingBottom: 20,
    justifyContent: 'center',
    position: 'absolute',
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 10,
  },
})
