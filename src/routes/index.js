import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import StackRoutes from './stack.routes';
  
const MyTheme = {
    dark: false,
    colors: {
      primary: 'rgb(255, 45, 85)',
      background: '#FFFFFF',
      card: 'rgb(255, 255, 255)',
      text: 'rgb(28, 28, 30)',
      border: 'rgb(199, 199, 204)',
      notification: 'rgb(255, 69, 58)',
    },
  };

export default function Routes(){
return(
    <NavigationContainer
    theme={MyTheme}
    screenOptions={{
        cardStyle: { backgroundColor: '#FFFFFF' }
        }}>
        <StackRoutes />
    </NavigationContainer>
    )
}