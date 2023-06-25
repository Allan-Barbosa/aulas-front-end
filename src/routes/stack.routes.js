import { createStackNavigator } from '@react-navigation/stack';

import index from '../pages'
import cadastro from '../pages/cadastro'
import alterarSenha from '../pages/alterarSenha'
import TabRoutes from './tab.routes';  

const Stack = createStackNavigator();

export default function MyStack() {
    return (
        <Stack.Navigator
            initialRouteName='index'
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