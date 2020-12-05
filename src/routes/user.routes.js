import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../pages/SignIn';

const UserStack = createStackNavigator();

const UserRoutes = () => (
  <UserStack.Navigator>
    <UserStack.Screen name="SignIn" component={SignIn} options={{
        headerShown: false,
    }} />
  </UserStack.Navigator>
);

export default UserRoutes;