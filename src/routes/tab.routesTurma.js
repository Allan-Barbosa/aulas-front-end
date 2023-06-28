import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import aulasVagas from '../pages/aulasVagas'
import gerenciamentoTurma from '../pages/gerenciamentoTurma'
import calendario from '../pages/calendario'
import disciplinas from '../pages/disciplinas'


import { Entypo, AntDesign, FontAwesome } from '@expo/vector-icons';

const tab = createBottomTabNavigator();

export default function MyTab() {
    return (
        <tab.Navigator
        initialRouteName= 'aulas vagas'
            screenOptions={{
                cardStyle: { backgroundColor: '#FFFFFF' },
                tabBarActiveTintColor: "blue"
            }}
        >
            <tab.Screen
                name="calendário"
                component={calendario}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => {
                        return <AntDesign name="calendar" size={size} color={color} />
                    }
                }}
            />

            <tab.Screen
                name="disciplinas"
                component={disciplinas}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => {
                        return <Entypo name="open-book" size={size} color={color} />
                    }
                }} />
                
                <tab.Screen
                name="aulas vagas"
                component={aulasVagas}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => {
                        return <FontAwesome name="book" size={size} color={color} />
                    }
                }} />

                <tab.Screen
                name="gerenciamento"
                component={gerenciamentoTurma}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => {
                        return <FontAwesome name="gear" size={size} color={color} />
                    }
                }} />

        </tab.Navigator>
    );
}