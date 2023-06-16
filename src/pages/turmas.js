import React from 'react'
import { Image, Box, Center, Text, FormControl, Pressable, Icon, VStack, Heading, HStack, ScrollView, AspectRatio, Stack } from 'native-base'
import { useForm, Controller } from "react-hook-form";
import { MaterialIcons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'
import { Input } from '../components/input';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../components/button';
import { Link } from '@react-navigation/native';
import fetch from 'node-fetch'
import { MenuProvider, renderers } from 'react-native-popup-menu';
import { SimpleLineIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import { Turma } from '../components/cardTurma';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
const Logo = require('../../assets/aulasLogo.png');
const { SlideInMenu } = renderers;


const LinearGradient = require('expo-linear-gradient').LinearGradient;

const config = {
  dependencies: {
    'linear-gradient': LinearGradient
  }
};

export default function Turmas() {
  return (
    <MenuProvider>
      <VStack config={config} safeArea flex={1}>
        <Box borderBottomWidth={'1px'} flexDirection={'row'} justifyContent={'space-around'} alignItems={'center'} h="89.8px" borderBottomColor='#D8D8D8'>
          <SimpleLineIcons name="logout" size={30} color="black" />
          <Box flexDirection={'row'} alignItems={'center'}>
            <Image size="59px" borderRadius={119} source={Logo} alt="Logo do aplicativo" />
            <Text ml='5px' fontSize='20px' fontWeight='normal' color='#1C1C1E' fontFamily='sans-serif-medium'>AULAS</Text>
          </Box>
          <Ionicons name="notifications-circle-outline" size={34} color="black" />
        </Box>
        <ScrollView>
          <Turma color1="red.400" color2="red.700" title="Análise e desenvolvimento de sistemas - módulo 1"></Turma>
          <Turma color1="blue.400" color2="lightBlue.700" title="Análise e desenvolvimento de sistemas - módulo 2"></Turma>
          <Turma color1="green.400" color2="green.700" title="Análise e desenvolvimento de sistemas - módulo 4"></Turma>
          <Turma color1="yellow.400" color2="yellow.700" title="Análise e desenvolvimento de sistemas - módulo 5"></Turma>
          <Turma color1="violet.400" color2="violet.700" title="Física - módulo 2"></Turma>
          <Turma color1="orange.400" color2="orange.700" title="Física - módulo 3"></Turma>
          <Turma color1="teal.400" color2="teal.700" title="Física - módulo 4"></Turma>
        </ScrollView>
        <Menu renderer={SlideInMenu}> 
      <MenuTrigger>
      <AntDesign right={20} bottom={20} position={'absolute'}  name="pluscircle" size={60} color="#0891b2" />
      </MenuTrigger>
      <MenuOptions optionsContainerStyle={{ position: 'absolute'}}> 
        <MenuOption  onSelect = { ( )  =>  alert ( ` Salvar` ) }  text = 'Criar turma' /> 
        <MenuOption  onSelect = { ( )  =>  alert ( ` Salvar` ) }  text = 'Entrar na turma' /> 
      </MenuOptions> 
    </Menu> 

      </VStack>
      </MenuProvider>

      );
}