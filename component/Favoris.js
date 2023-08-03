import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export default function Favoris({ route }) {
  const { favoriteData, isFavorite } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoris</Text>
      {isFavorite && favoriteData.length > 0 ? (
        <FlatList
          data={favoriteData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.favoriteItem}>
              <Text>{item.adresse}</Text>
        
        
            </View>
          )}
        />
      ) : (
        <Text style={styles.container}>Aucun logement en favori pour le moment.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  favoriteItem: {
    marginBottom: 10,
    backgroundColor: 'white',
    padding: 10,
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
});
