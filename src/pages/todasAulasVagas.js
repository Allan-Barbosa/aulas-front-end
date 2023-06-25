import React from 'react'
import { Image, Box, Center, Text, FormControl, Pressable, Icon, VStack, Heading, HStack, ScrollView } from 'native-base'
import { useForm, Controller } from "react-hook-form";
import { MaterialIcons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'
import { Input } from '../components/input';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../components/button';
import { Link } from '@react-navigation/native';
import { SimpleLineIcons, Ionicons  } from '@expo/vector-icons'; 
const Logo = require('../../assets/aulasLogo.png');

export default function TodasAulasVagas() {
    return (
            <VStack safeArea flex={1}>
                <Box  borderBottomWidth={'1px'} flexDirection={'row'} justifyContent={'space-around'} alignItems={'center'} h="89.8px" borderBottomColor='#D8D8D8'>
                <SimpleLineIcons name="logout" size={30} color="black" />   
                <Box flexDirection={'row'} alignItems={'center'}>
                <Image size="59px" borderRadius={119} source={Logo} alt="Logo do aplicativo" /> 
                <Text ml='5px' fontSize='20px' fontWeight='normal' color='#1C1C1E' fontFamily='sans-serif-medium'>AULAS</Text>
                </Box>
                <Ionicons name="notifications-circle-outline" size={34} color="black" />
                </Box>
            </VStack>
    );
}