import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function  AuthenticationScreen ({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);

  const NavigationToCarldList = () => {
    navigation.navigate('CardList');
  };

  const handleAuthentication = () => {
    if (isSignUp) {
      console.log('Inscription:', email, password, confirmPassword);
    } else {
      console.log('Connexion:', email, password);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isSignUp ? 'Inscription' : 'Connexion'}</Text>
      {isSignUp && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Civilité"
          />
          <TextInput
            style={styles.input}
            placeholder="Nom"
          />
          <TextInput
            style={styles.input}
            placeholder="Prénom"
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmer le mot de passe"
            secureTextEntry
            onChangeText={text => setConfirmPassword(text)}
            value={confirmPassword}
            autoCapitalize="none"
          />
        </>
      )}
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        value={email}
        autoCapitalize="none"
        autoCompleteType="email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        onChangeText={text => setPassword(text)}
        value={password}
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.authButton} onPress={handleAuthentication}>
        <Text style={styles.authButtonText}>{isSignUp ? "S'inscrire" : 'Se connecter'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.switchButton} onPress={() => setIsSignUp(prevIsSignUp => !prevIsSignUp)}>
        <Text style={styles.switchButtonText}>
          {isSignUp ? 'Déjà inscrit? Se connecter' : "Pas de compte ? S'inscrire"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.skipButton}>
        <Text style={styles.skipText} onPress={NavigationToCarldList}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
  authButton: {
    backgroundColor: 'blue',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  authButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchButton: {
    marginBottom: 20,
  },
  switchButtonText: {
    textDecorationLine:'none',
    color: 'blue',
    fontSize: 16,
  
  },
  skipButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
  },
  skipText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

