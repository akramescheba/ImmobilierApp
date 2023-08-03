import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity, Linking, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';

const API = require('./json/data.json');

export default function CardList({ navigation }) {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setData(API);
  }, []);

 const sendEmail = (email) => {
    const mailtoUrl = `mailto:${email}`;
    Linking.openURL(mailtoUrl)
      .then(() => {
        console.log('E-mail envoyé avec succès !');
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi de l'e-mail :", error);
      });
  };

   const makePhoneCall = (phoneNumber) => {
    const telUrl = `tel:${phoneNumber}`;
    Linking.openURL(telUrl)
      .then(() => {
        console.log('Appel téléphonique en cours...');
      })
      .catch((error) => {
        console.error("Erreur lors de l'appel téléphonique :", error);
      });
  };

  const openLocation = (latitude, longitude) => {
    const locationUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(locationUrl)
      .then(() => {
        console.log('Application de cartographie ouverte !');
      })
      .catch((error) => {
        console.error("Erreur lors de l'ouverture de l'application de cartographie :", error);
      });
  };


  const filteredData = data.filter((reponse) => {
    return reponse.adresse.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by address"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <ScrollView contentContainerStyle={styles.cardContainer}>
        {filteredData.map((reponse) => (
     
          <View key={reponse.tel} style={styles.cardContainer}>
          <Image source={{ uri: reponse.image }} style={styles.image} />
          <View style={styles.infoContainer}>
            <Text style={styles.adresseText}>{reponse.adresse}</Text>
            <TouchableOpacity onPress={() => openLocation(reponse.latitude, reponse.longitude)}>
              <Text style={styles.locationText}>Voir sur la carte</Text>
            </TouchableOpacity>
            <View style={styles.contactContainer}>
              <TouchableOpacity onPress={() => makePhoneCall(reponse.contact.tel)}>
                <Feather name="phone" size={18} color="#007FFF" style={styles.contactIcon} />
              </TouchableOpacity>
              <Text style={styles.contactText}>{reponse.contact.tel}</Text>
            </View>
            <View style={styles.contactContainer}>
              <TouchableOpacity onPress={() => sendEmail(reponse.contact.email)}>
                <Feather name="mail" size={18} color="#007FFF" style={styles.contactIcon} />
              </TouchableOpacity>
              <Text style={styles.contactText}>{reponse.contact.email}</Text>
            </View>
            <Text style={styles.descriptionText}>{reponse.description}</Text>
          </View>
        </View>

        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  searchInput: {
    width:300,
    height: 40,
    borderColor: '#007FFF',
    borderWidth: 1,
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
  locationText: {
    fontSize: 14,
    color: '#007FFF',
    marginBottom: 3,
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
});
