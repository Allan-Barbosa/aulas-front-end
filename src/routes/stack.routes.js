import { createStackNavigator } from '@react-navigation/stack';

import React, { useEffect, useState } from 'react';
import index from '../pages'
import cadastro from '../pages/cadastro'
import alterarSenha from '../pages/alterarSenha'
import TabRoutes from './tab.routes';
import TabRoutesTurma from './tab.routesTurma';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

export default function MyStack() {
    const [initialRoute, setInitialRoute] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const getMyStringValue = async () => {
            try {
                const value = await AsyncStorage.getItem('acesso');
                if (value === 'true') {
                    setInitialRoute('turmas1');
                    setIsLoading(false)
                    console.log('dentro')
                }
                else {
                    setInitialRoute('index');
                    setIsLoading(false)
                    console.log('dentro')
                }
            } catch (error) {
                // Error reading data
            }
        };

        getMyStringValue();
    }, []);

    if (isLoading) {
        // Renderizar indicador de carregamento ou null enquanto o valor está sendo buscado
        return null;
    }

    console.log(initialRoute)
    return (
        <Stack.Navigator
        // initialRouteName={initialRoute}
        initialRouteName= 'index'
            screenOptions={{
                cardStyle: { backgroundColor: '#FFFFFF' }
            }}
        >

            <Stack.Screen
                name="index"
                options={{ headerShown: false }}
                component={index} />

            <Stack.Screen
                name="turmas1"
                options={{ headerShown: false }}
                component={TabRoutes} />


            <Stack.Screen
                name="turmas2"
                options={{ headerShown: false }}
                component={TabRoutesTurma} />

            <Stack.Screen
                name="cadastro"
                options={{ headerShown: false }}
                component={cadastro} />

            <Stack.Screen
                name="alterarSenha"
                options={{ headerShown: false }}
                component={alterarSenha} />

        </Stack.Navigator>
    );
}