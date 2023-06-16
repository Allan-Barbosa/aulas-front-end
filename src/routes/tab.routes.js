import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import todasAulasVagas from '../pages/todasAulasVagas'
import turmas from '../pages/turmas'

import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const tab = createBottomTabNavigator();

export default function MyTab() {
    return (
        <tab.Navigator
            screenOptions={{
                cardStyle: { backgroundColor: '#FFFFFF' },
                tabBarActiveTintColor: "blue"
            }}
        >
            <tab.Screen
                name="turmas"
                component={turmas}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => {
                        return <Entypo name="home" size={size} color={color} />
                    }
                }}
            />

            <tab.Screen
                name="aulas vagas"
                component={todasAulasVagas}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => {
                        return <FontAwesome name="book" size={size} color={color} />
                    }
                }} />

        </tab.Navigator>
    );
}