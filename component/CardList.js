import React, { useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import Details from './Details'

const API = require('./json/data.json')

export default function CardList({ navigation }) {
  const navigateToDetails = (data) => {
    navigation.navigate('Details', { data })
  }

  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); 
  useEffect(() => {
    setData(API);
  }, []);

  // Fonction pour filtrer les données en fonction de la valeur de recherche
  const filteredData = data.filter(
    (reponse) =>
      reponse.adresse.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reponse.contact.tel.includes(searchQuery)
  );



  const openMaps = (address) => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address,
    )}`
    Linking.openURL(mapsUrl)
      .then(() => {
        console.log('Ouverture de Maps...')
      })
      .catch((error) => {
        console.error("Erreur lors de l'ouverture de Maps :", error)
      })
  }

  const sendEmail = (email) => {
    const mailtoUrl = `mailto:${email}`
    Linking.openURL(mailtoUrl)
      .then(() => {
        console.log('E-mail envoyé avec succès !')
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi de l'e-mail :", error)
      })
  }

  const makePhoneCall = (phoneNumber) => {
    const telUrl = `tel:${phoneNumber}`
    Linking.openURL(telUrl)
      .then(() => {
        console.log('Appel téléphonique en cours...')
      })
      .catch((error) => {
        console.error("Erreur lors de l'appel téléphonique :", error)
      })
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
         <TextInput
        style={styles.searchInput}
        placeholder="Rechercher.."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      
      {filteredData.map((reponse) => (
        <TouchableOpacity
          key={reponse.tel}
          style={styles.cardContainer}
          onPress={() => navigateToDetails(reponse)}
        >
          <Image source={{ uri: reponse.image }} style={styles.image} />
          <View style={styles.infoContainer}>
            <View style={styles.contactContainer}>
              <TouchableOpacity onPress={() => openMaps(reponse.adresse)}>
                <Feather
                  name="map-pin"
                  size={18}
                  color="#007FFF"
                  style={styles.contactIcon}
                />
              </TouchableOpacity>

              <Text style={styles.adresseText}>{reponse.adresse}</Text>
            </View>

            <View style={styles.contactContainer}>
              <TouchableOpacity
                onPress={() => makePhoneCall(reponse.contact.tel)}
              >
                <Feather
                  name="phone"
                  size={18}
                  color="#007FFF"
                  style={styles.contactIcon}
                />
              </TouchableOpacity>
              <Text style={styles.contactText}>{reponse.contact.tel}</Text>
            </View>
            <View style={styles.contactContainer}>
              <TouchableOpacity
                onPress={() => sendEmail(reponse.contact.email)}
              >
                <Feather
                  name="mail"
                  size={18}
                  color="#007FFF"
                  style={styles.contactIcon}
                />
              </TouchableOpacity>
              <Text style={styles.contactText}>{reponse.contact.email}</Text>
            </View>
            <Text style={styles.descriptionText}>{reponse.description}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#007FFF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  adresseText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  contactIcon: {
    marginRight: 5,
  },
  contactText: {
    fontSize: 14,
    color: '#555',
  },
  descriptionText: {
    fontSize: 14,
  },
})
