import { StatusBar } from 'expo-status-bar';
import { AppLoading } from 'expo';  
import React from 'react';

import Routes from './src/routes';

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { UserProvider } from './src/contexts/user';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';

export default function App() {
  let [fontsLoaded] = useFonts({
    "bold": Poppins_700Bold,
    "semibold": Poppins_600SemiBold,
    "regular": Poppins_400Regular 
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer theme={DefaultTheme}>
        <UserProvider value={{ signed: true }}>
          <Routes />
          <StatusBar style='auto' />
        </UserProvider>
      </NavigationContainer>
    );
  }
}
