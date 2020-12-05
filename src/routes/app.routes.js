import 'react-native-gesture-handler';
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home';
import WildcardForm from '../pages/WildcardForm';

const Stack = createStackNavigator();

export default function AppRoutes() {
  return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Opções" component={WildcardForm} options={{
                cardStyle: {
                  backgroundColor: '#fff'
                },
                headerStyle: {
                  elevation: 0
                }
            }} />
        </Stack.Navigator>
  );
}