import React from 'react'
import { StatusBar } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import Getstarted from './component/Getstarted'
import Connexion from './component/Connexion'
import CardList from './component/CardList'
import Details from './component/Details'
import Favoris from './component/Favoris'
import searchQuery from './component/searchQuery'

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />

      <Stack.Navigator>
        <Stack.Screen
          name="Getstarted"
          component={Getstarted}
          options={{
            title: 'GetStarted',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="Connexion"
          component={Connexion}
          options={{
            title: 'Page de connexion',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="CardList"
          component={CardList}
          options={{
            title: 'Immeubles',
            headerTitleAlign: 'center',
            headerRight: () => (
              <Ionicons
                name="home"
                size={25}
                color="black"
                style={{ marginRight: 15 }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            title: 'Details',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="Favoris"
          component={Favoris}
          options={{
            title: 'Favoris',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="searchQuery"
          component={searchQuery}
          options={{
            title: 'Recherche',
            headerTitleAlign: 'center',
            headerRight: () => (
              <Ionicons
                name="search"
                size={25}
                color="black"
                style={{ marginRight: 15 }}
              />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
