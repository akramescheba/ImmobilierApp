import React, { useState } from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';


export default function Details({ route, navigation }) {
  const { data } = route.params;

  const [isFavorite, setIsFavorite] = useState(false);

  

  const handleReservation = () => {


    console.log('Réservation en cours...');
  };

  const handleFavorite = () => {
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
  

    // Naviguer vers la page Favoris lorsque l'utilisateur ajoute/retire des favoris
    navigation.navigate('Favoris', { favoriteData: data, isFavorite: !isFavorite });
  };

  const openMaps = (address) => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address,
    )}`;
    Linking.openURL(mapsUrl)
      .then(() => {
        console.log('Ouverture de Maps...');
      })
      .catch((error) => {
        console.error("Erreur lors de l'ouverture de Maps :", error);
      });
  };

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

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Image source={{ uri: data.image }} style={styles.image} />

        <View style={styles.contactContainer}>
          <TouchableOpacity onPress={() => openMaps(data.adresse)}>
            <Feather
              name="map-pin"
              size={18}
              color="#007FFF"
              style={styles.contactIcon}
            />
          </TouchableOpacity>

          <Text style={styles.adresseText}>{data.adresse}</Text>
        </View>

        <View style={styles.contactContainer}>
          <TouchableOpacity onPress={() => makePhoneCall(data.contact.tel)}>
            <Feather
              name="phone"
              size={18}
              color="#007FFF"
              style={styles.contactIcon}
            />
          </TouchableOpacity>
          <Text style={styles.contactText}>{data.contact.tel}</Text>
        </View>
        <View style={styles.contactContainer}>
          <TouchableOpacity onPress={() => sendEmail(data.contact.email)}>
            <Feather
              name="mail"
              size={18}
              color="#007FFF"
              style={styles.contactIcon}
            />
          </TouchableOpacity>
          <Text style={styles.contactText}>{data.contact.email}</Text>
        </View>
        <Text style={styles.descriptionText}>{data.description}</Text>


        <View style={styles.contactContainer}>
          <TouchableOpacity onPress={() => handleReservation()}>
            <Text style={styles.reserverButton}>Réserver</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFavorite()}>
            <FontAwesome
              name={isFavorite ? 'heart' : 'heart'} 
              size={24}
              color={isFavorite ? 'grey' : 'red'} 
              style={styles.favoriteIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 20,
  },
  infoContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#007FFF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  adresseText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  reserverButton: {
    fontSize: 18,
    color: '#007FFF',
    marginRight: 10,
  },
  favoriteIcon: {
    marginLeft: 'auto',
  },
  contactText: {
    fontSize: 16,
    color: '#555',
  },
  descriptionText: {
    fontSize: 18,
    marginTop: 20,
  },
});
